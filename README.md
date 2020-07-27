# Deployed API
to be made monday.

# Register / Login Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | /api/register | register a new user |
| POST | /api/login | login a user |


# Tech Endpoints -- authentication required
| Request | URL | Description |
| ------- | --- | ----------- |
| GET | api/tech | get all tech items |
| GET | api/tech/:id | get tech item with specific id |
| PUT | api/tech/:id | edit specific tech item |
| DELETE | api/tech/:id | delete specific tech item |


# Users Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| GET | api/users | get all users |
| GET | api/users/:id | get user by id |
| GET | api/users/:id/owned | get all items user owns |
| GET | api/users/:id/rented | get all items user is currently renting |
| POST | api/users/:id | add an item to rent out |
| PUT | api/users/:id | edit specific user |
| DELETE | api/users/:id | delete specific user |

# Owners
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| username | string | yes | yes | username |
| password | string | yes | no | password |
| firstName | string | yes | no | user's first name |
| lastName | string | yes | no | users' last name |

# Items
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| name | string | yes | no | item name |
| description | string | yes | no | item description |
| condition | string | yes | no | item condition |
| price | float | yes | no | item's price per period |
| period | integer | yes | no | period to rent out |
