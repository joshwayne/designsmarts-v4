---
templateKey: design-pattern
title: Magic Link
description: Magic Link is an authentication method where a user is emailed a
  link that will log them in instantly.
categories:
  - Account Creation and Onboarding
---
### Benefits

* Less work than entering a traditional email and password (especially on mobile).
* Adds a layer of security because it verifies the person logging in has access to the email used on the account.
* Great for account setup flows compared to the old method of generating a temporary password.

### Drawbacks

* It introduces friction because it forces users to leave the app, open their email app to click the link, then switch back to the app.
* It also adds friction for users with password managers.

### Best practices

* Magic links tend to be very long so shorting the link text to something like "Log in now" is recommended.
* It's recommended to also use a traditional email and password login for users who don't want to use their email every time (like users who use password managers).