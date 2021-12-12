---
layout: post
title:  "FreeBSD Ports :: Patching Privately :: Notes on privately patching ports"
date:   2021-12-11 17:00:03 -0700
categories: jekyll update
---
### Intro to the problem.
- Plex reports a new versions of the server; but the port maintainer in FreeBSD have not updated the port.
  - Eventually I'd like to be able to submit patches to help out. But for now; I whipped up a script to do it for me privately.
  - This is by no means the best solution, it's just how I've chosen to do it until I figure out the "proper way", I am certain it is by no means the only way to solve the problem.
  - This post serves to document my quick scratch program; the thought processes behind it (to better understand what I did, and what materials I referenced), so I can make changes in the future and make it better
---


### API Call: To Tautilli - get plex version.

- The first thing I need to be able to detect in my script is - if a new version of plex has been released.
 - There is a notification in plex; likely there is a way to pull the information directly from the server via an API call. I just chose to use [Tautulli] and it's exposed API. I had just finished setting it up.
 - The [Tautulli] API Documentation is located: [Tautulli-API-Reference].
 - The script is written in `/usr/bin/env sh` the default shell on Freebsd. I'm sure it could be ported to many other languages.


- *Set Script Variables.*
  - ```
 # API Endpoint settings.
 apikey=key
 cmd=get_pms_update
 url=IPADDRESS
 port=8181
 distfiles=/usr/ports/distfiles
 ports_dir=/usr/ports/multimedia/plexmediaserver-plexpass
 email=your@email.address
 ```
  - *NOTE: Remember to replace the settings with your own*

- Make the call to the API endpoint using curl, set it as a variable 'json'.
 - `json=$(curl -s -X GET "http://$url:$port/api/v2?apikey=$apikey&cmd=$cmd")`



[Tautulli]: https://tautulli.com/
[Tautulli-API-Reference]: https://github.com/Tautulli/Tautulli/wiki/Tautulli-API-Reference
