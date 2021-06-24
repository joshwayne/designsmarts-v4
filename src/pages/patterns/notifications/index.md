---
templateKey: design-pattern
title: Notifications
description:
categories:
  - Content Display
---

> Notifications are informational messages that give feedback on the outcome of an action or general occurrences in the application.

> Appear temporarily towards the bottom of the screen.
Appear as a result of user action or general occurrences (e.g. network error) in the application.
Do not interrupt the user experience or require an action to be taken to disappear.
Dismissed automatically after a specified duration or via user interaction.

> Best practices
#Provide a short and affirmative message
The message of notifications should be easy to understand at a glance.
A general rule of thumb would be to follow the pattern of noun + verb.
For example, prefer "User deleted" over "The user has been deleted".
#Actionable notifications
In most cases, notifications are purely informative with no immediate action to be taken. However, it is totally valid to provide an action.
For example, you could allow users to amend choices by displaying an "Undo" action.
#Automatic dismissal duration
Usually, notifications are dismissed automatically after 4 seconds.
This should give the user enough time to understand the message, provided it is short and straightforward.
For actionable notifications, the duration can be extended up to 10 seconds to give the user enough time to interact with it.
Depending on the context, the duration may vary. Consider exposing an option to modify the duration as needed.
#Pause automatic dismissal timer on hover
This can be a useful feature to give the user time to digest the message or come to a decision before the dismissal.
Once the mouse leaves the notification, the timer is restarted and will dismiss automatically after it runs to completion.
#Positioning
Notifications usually appear towards the bottom left of the screen which in most cases is the least disruptive area and does not contain interactive elements.
If multiple notifications are displayed, they should stack on top of each other with the latest one on top, and expand on hover. To avoid cluttering the UI, limit the stack up to 3 notifications.
Alternatively, they can be displayed alongside each other without the stacking and hover interaction.
#Naming
You might have encountered varying naming conventions for this component:
Snackbar
Toast
Alert
Notification
At first, Alert can seem like the most obvious choice. Although, alerts are generally meant to appear in context, alongside other UI elements. Moreover, the WAI-ARIA Practices for Alert do not recommend alerts that disappear automatically.
We believe that component names should be self-descriptive, and communicate how the component should behave, rather than look, so we recommend using Notification.

[https://uiplaybook.dev/play/notification](https://uiplaybook.dev/play/notification)

[https://polaris.shopify.com/components/feedback-indicators/toast](https://polaris.shopify.com/components/feedback-indicators/toast)

[https://www.nngroup.com/articles/indicators-validations-notifications/](https://www.nngroup.com/articles/indicators-validations-notifications/)

[https://vercel.com/design/toast](https://vercel.com/design/toast)

### Benefits

### Drawbacks

### Best practices


### Code links