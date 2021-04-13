<?php

namespace Tests\Feature;

use App\Contact;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testOnlyUserAuthenticatedCanAccess()
    {

        $response = $this->getJson('/contacts');

        $response->assertStatus(401);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserAccessWhenAuthenticated()
    {

        $this->actingAs(factory(User::class)->create());
        $response = $this->getJson('/contacts');

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserGetContacts()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $user->contacts()->save(factory(Contact::class)->make());

        $response = $this->getJson('/contacts');

        $response->assertStatus(200);
        $this->assertCount(1, $user->contacts);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserAddContacts()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $contact = (factory(Contact::class)->make())->getAttributes();

        $response = $this->postJson('/contacts', $contact );

        $response->assertStatus(200);
        $this->assertCount(1, $user->contacts);
        $this->assertDatabaseHas('contacts', [
            'phone' => $contact['phone'],
            'email' => $contact['email'],
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testValidationDataOnStoreContact()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $contact = (factory(Contact::class)->make([
            'first_name' => '',
            'email' => '',
            ]))->getAttributes();

        $response = $this->postJson('/contacts', $contact);

        $response->assertStatus(422);
        $response->assertJson([
            'errors' => ['email' => ['The email field is required.']]
        ]);
        $this->assertCount(0, $user->contacts);
        $this->assertDatabaseMissing('contacts', [
            'phone' => $contact['phone'],
            'email' => $contact['email'],
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testEditContact()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $contact = $user->contacts()->save(factory(Contact::class)->make());

        $response = $this->json('PUT', "/contacts/{$contact->id}", 
                                array_merge($contact->getAttributes(), [
                                    'first_name' => "FirstName edited",
                                    'phone' => '778435052',
                                ]));

        $response->assertStatus(200);
        $response->assertJson([
            'first_name' => 'FirstName edited',
        ]);
        $this->assertCount(1, $user->contacts);
        $this->assertDatabaseHas('contacts', [
            'first_name' => "FirstName edited",
            'phone' => '778435052',
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testEditContactWithInvalidData()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $contact = $user->contacts()->save(factory(Contact::class)->make());

        $response = $this->json('PUT', "/contacts/{$contact->id}", 
                                array_merge($contact->getAttributes(), [
                                    'first_name' => "",
                                    'phone' => '',
                                ]));

        $response->assertStatus(422);
        $response->assertJson([
            'errors' => ['first_name' => ['The first name field is required.']]
        ]);
        $this->assertCount(1, $user->contacts);
        $this->assertDatabaseMissing('contacts', [
            'first_name' => "",
            'phone' => '',
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testDeleteContact()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $contact = $user->contacts()->save(factory(Contact::class)->make());

        $response = $this->json('DELETE', "/contacts/{$contact->id}");

        $response->assertStatus(200);
        $this->assertCount(0, $user->contacts);
        $this->assertDatabaseMissing('contacts', [
            'first_name' => $contact->first_name,
            'phone' => $contact->last_name,
        ]);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testNotDeleteContactifNotAuthenticated()
    {
        $user = factory(User::class)->create();
        $contact = $user->contacts()->save(factory(Contact::class)->make());

        $response = $this->json('DELETE', "/contacts/{$contact->id}");

        $response->assertStatus(401);
        $this->assertCount(1, $user->contacts);
        $this->assertDatabaseHas('contacts', [
            'first_name' => $contact->first_name,
            'phone' => $contact->phone,
        ]);
    }
}
