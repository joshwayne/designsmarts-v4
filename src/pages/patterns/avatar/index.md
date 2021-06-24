---
templateKey: design-pattern
title: Avatar
description:
categories:
  - Content Display
otherNames: profile picture
# tags: image
---

> **Provide an image**
Whenever possible, try to use a thumbnail image of a user instead of a dull, default human silhouette placeholder.
Not only does this give an additional humanizing touch to the interface, but it can help to visually organize, remember, and make sense of sections with multiple users.

> **Generate a unique image fallback**

> If the image does not load or is unavailable — consider alternatives that are unique to a user.
For example, you could display initials with a unique background image that is based on the user's name:

> Thomas ShelbyTSJoe DoeJDMichael JordanMJ

> This way the identity of a user will always be unique and pure!

> **Expose multiple sizes**

> A single size avatar does not work for every use case. For example, due to inherent layout constraints, tables, usually require a smaller variant, whereas profile cards can accommodate a larger one.
At the very least, consider exposing two sizes — large and small.

### Benefits

### Drawbacks

### Best practices

### Code links