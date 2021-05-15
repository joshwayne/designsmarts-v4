---
templateKey: blog-post
title: Make click areas bigger for better usability
date: 2015-10-02T02:46:41.870Z
updated: 2015-10-02T02:46:41.870Z
description: "Quick usability tip for y’all: Make your click areas bigger."
alt_summary: "Quick usability tip for y’all: Make your click areas bigger."
tags:
cover_credit: 'Photo by <a href="https://unsplash.com/photos/dFwtwXRQ2yQ?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Cleo Vermij</a> on <a href="https://unsplash.com">Unsplash</a>'
featuredpost: false
featuredimage: cover.jpg
---

Quick usability tip for y’all:

**Make your click areas bigger.**

Click areas are the clickable (or tappable) parts of links and buttons in your app. And they’re probably making your users work harder than they need to.

What do I mean? Let’s look at an example. Here’s the navigation for Rdio’s web app:

[![Medium confirm email](2015-10-02-make-click-areas-bigger/rdio.png){: width="423"}](2015-10-02-make-click-areas-bigger/rdio.png){: .no-underline}

Rdio's navigation kinda drives me nuts. Why? Because of the click areas.

[![Medium confirm email](2015-10-02-make-click-areas-bigger/rdio-highlighted.png){: width="424"}](2015-10-02-make-click-areas-bigger/rdio-highlighted.png){: .no-underline}

When the click areas are highlighted, we can see the size of the links are as big as the length of the text. There isn't a problem for longer text, but look at the Jazz playlist above. That click area is *tiny*. It makes the playlist unnecessarily difficult to click on.



### Why are small click areas a problem?

* **Clicking on small things is more work**. Smaller click areas require precise mouse movements. Users shouldn’t need the mouse skills of a sniper to use basic functionality of your app.
* **The design makes it look clickable**. If the navigation is in a row or a column, there's white space around each item. The click area should take up the space surrounding each item.
* **Click feedback is easy to miss**. Not everyone waits for the cursor to change before they click on something. Users don’t pay attention to the details when their attention is somewhere else. Distracted, frustrated, busy, or bored. In my own user testing, I've seen multiple times when a user thought they clicked on a link and wondered why nothing was happening.

### Fixing your click areas

The good news is most click area problems are simple fixes. Take a look at the navigation for Lab Door:

[![LabDoor navigation](2015-10-02-make-click-areas-bigger/labdoor.png)](2015-10-02-make-click-areas-bigger/labdoor.png){: .no-underline}

The design would lead you to believe that the white space area in that white bar is clickable for each link. Now let's highlight the click areas.

[![LabDoor navigation with highlighted click areas](2015-10-02-make-click-areas-bigger/labdoor-highlighted.png)](2015-10-02-make-click-areas-bigger/labdoor-highlighted.png){: .no-underline}

When we highlight the click areas, we can see the click areas barely extend past the link text. It's very easy for someone to accidentally click in the whitespace around the link rather than on the link they wanted to click on. By expanding the click area to fill the white space surrounding each link, we can improve the usability of the navigation.

[![LabDoor navigation with improved click areas](2015-10-02-make-click-areas-bigger/labdoor-fixed.png)](2015-10-02-make-click-areas-bigger/labdoor-fixed.png){: .no-underline}

Design for users that don't have your full attention and you'll improve the experience for all users.

### Testing your own app

To highlight links like the previous examples, open up the Developer Tools (or Web Inspector) panel on your site and add the following CSS rule:

```
a {
  background-color: rgba(255,0,0,0.25) !important
}
```

Or if you want a quicker way, I’ve whipped up a little bookmarklet that highlights all your links for you. Just drag this link into your bookmarks bar and test away.

<a href="javascript:(function(){var sheet = document.styleSheets[0];sheet.insertRule('a { background-color: rgba(255,0,0,0.25) !important; }', 1);})();">Click Area Checker</a>

The bookmarklet only highlights links in red. If you’re interested in making it better, feel free to <a href="https:/gist.github.com/joshwayne/66661d70a65fd3075dce">fork it on Github</a>.
