auth-app
========

Central Authentication for all subsequent applications

Designed on-top of [ArrestDB](https://github.com/bign8/ArrestDB) to be the main authentication portal for several apps to come.  For now, not much data is stored in the database, just usernames, emails, hashed-passwords.  As time goes on this will be built into a robust system.

# General API
POST `//host.com/api/login`
```json
{
    "user": "one@example.com",
    "pass": "xxxyyyzzz",
}
```
Response:
```json
{
    "success": {
        "code": 200,
        "status": "OK",
        "userID": "1",
    }
}



