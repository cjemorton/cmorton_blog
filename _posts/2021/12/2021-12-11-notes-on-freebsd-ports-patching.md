---
layout: post
title:  "FreeBSD Ports :: Patching Privately :: Notes on privately patching ports"
date:   2021-12-11 17:00:03 -0700
categories: jekyll update
---
### The Issue.
Plex reports a new versions of the server, but the port maintainer in FreeBSD have not updated the port.

Eventually I'd like to be able to submit patches to help out. But for now; I whipped up a script to do it for me.

This is by no means the best solution, it's just how I've chosen to do it until I figure out the "proper way", it is by no means the only way to solve the problem.

This post serves to document my quick scratch program; the thought processes behind it (to better understand what I did, and what materials I referenced), so I can make changes in the future and make it better.
---
### **API Call to Tautilli to get plex version.**

1. The first thing I need to be able to detect in my terminal is if a new version of plex has been released.
 - There is a notification in plex; likely a way to pull the information directly from the server via an API call. I just chose to use [Tautilli] and it's exposed API, I had just finished setting it up.
 - The API documentation I referenced is actually quite well done. It's located: [Tautulli-API-Reference].
 - The script is written in `/usr/bin/env sh` as that just what runs by default in FreeBSD, I'm sure it could be ported to many other languages.

 *Setting SCRIPT Variables.*
 ```
 # API Endpoint settings.
 apikey=key
 cmd=get_pms_update
 url=IPADDRESS
 port=8181
 distfiles=/usr/ports/distfiles
 ports_dir=/usr/ports/multimedia/plexmediaserver-plexpass
 email=your@email.address
 ```




[Tautulli]: https://tautulli.com/
[Tautulli-API-Reference]: https://github.com/Tautulli/Tautulli/wiki/Tautulli-API-Reference
