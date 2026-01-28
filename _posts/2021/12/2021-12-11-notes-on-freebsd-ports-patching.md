---
layout: post
title:  "FreeBSD Ports :: Patching Privately :: Notes on privately patching ports"
date:   2021-12-11 17:00:03 -0700
categories: technical sysadmin
tags: [freebsd, ports, patching, shell-scripting, plex]
excerpt: "Building a shell script to automatically patch and update FreeBSD ports when upstream changes aren't yet available."
---
### Intro to the Problem
Plex reports a new version of the server. The FreeBSD port maintainer has not updated the port yet.

> Eventually I'd like to be able to submit patches to help out. But for now, I whipped up a script to do it for me privately.

> This is by no means the best solution—it's just how I've chosen to do it until I figure out the "proper way." I am certain it is by no means the only way to solve the problem.

> This post serves to document my quick scratch program and the thought processes behind it (to better understand what I did and what materials I referenced) so I can make changes in the future and improve it. This is just the initial version; there are already changes I am planning on making as this script makes a lot of assumptions about its environment.

*NOTE: I plan to place this whole project in a GitHub repository.*

---

### API Call to Tautulli - Get Plex Version

> The first thing I need to be able to detect in my script is whether a new version of Plex has been released.

> There is a notification in Plex; likely there is a way to pull the information directly from the server via an API call. I just chose to use [Tautulli] and its exposed API. I had just finished setting it up.

> The [Tautulli] API documentation is located at: [Tautulli-API-Reference].

> The script is written in `/usr/bin/env sh`, the default shell on FreeBSD. I'm sure it could be ported to many other languages.

> *Set Script Variables -> place in `settings.conf`*

```sh
apikey=yourAPIKEYtoTautulli
cmd=get_pms_update
url=172.16.0.1
port=8181
distfiles=/usr/ports/distfiles
ports_dir=/usr/ports/multimedia/plexmediaserver-plexpass
email=youremail@gmail.com
name=yourname
```

>*NOTE: Remember to replace the settings with your own*

> These variables are set at runtime from a `settings.conf`, and the script is executed by setting an alias in `~/.cshrc` or run directly.



Make the call to the API endpoint using curl, set it as a variable 'json'.

> `json=$(curl -s -X GET "http://$url:$port/api/v2?apikey=$apikey&cmd=$cmd`

The response comes back from the API endpoint as JSON. It now needs to be parsed for the information needed.

This can be done by piping the JSON through [jq], a command-line JSON processor (according to its manual page).

The pieces of information I need to get and set as variables in my script are as follows:

*(NOTE: I'm using xargs to make sure there's no junk or newline characters, etc., floating around—probably not needed, but in a quick and dirty script like this, it eliminates points of failure. Then it can be optimized.)*

> `update_available` - A true or false value.
>
> > `update_available=$(echo $json | jq '.response.data | {update_available}' | jq '.update_available')`
>
> `download_url` - The URL where the new file is located.
>
> > `download_url=$(echo $json | jq '.response.data | {download_url}' | jq '.download_url' | xargs)`
>
> `version` - The version number separated by a '-': a 'prefix' and a 'suffix'.
>
> > `version=$(echo $json | jq '.response.data | {version}' | jq '.version' | xargs)`
>
> `release_date` - The release date.
>
> > `timestamp=$(echo $json | jq '.response.data | {release_date}' | jq '.release_date' | xargs)`

> Another bit of information needed is the version prefix and suffix. This can be generated from the version string by splitting it in half using the '-' as a delimiter and storing each in its own variables for ease of use later.
>
> > `version_prefix=$(echo $version | cut -f 1 -d '-' | xargs)`
>
> > `version_suffix=$(echo $version | cut -f 2 -d '-' | xargs)`

That's all the information needed, collected into variables and ready to be used in the rest of the script.

The rest of the script can be found in my gist: [plex-ports-patch-dirty-logic]

> *NOTE: This script is just a reference. Check out my GitHub for the full version.*

The use of `aria2c` can be toggled on and off in this script by removing the #. Doing so lets me resume broken downloads. Plex servers are usually slow.

`make makesum` needs to be run to generate the file checksums. It will actually check and download the file if it's not present in the $distfiles directory.

If your plex server is running inside of a jail managed by `cbsd`, you can run these commands to kick off the build using `synth`.

> ```sh
> cbsd jexec jname=plex synth install multimedia/plexmediaserver-plexpass
> cbsd jexec jname=plex service plexmediaserver_plexpass status
> cbsd jexec jname=plex service plexmediaserver_plexpass stop
> cbsd jexec jname=plex service plexmediaserver_plexpass start
> cbsd jexec jname=plex service plexmediaserver_plexpass status
> ```

[jq]: https://stedolan.github.io/jq/
[plex-ports-patch-dirty-logic]: https://gist.github.com/cjemorton/a5332b6b6e71b4806a01bb63d39a0d29
[Tautulli]: https://tautulli.com/
[Tautulli-API-Reference]: https://github.com/Tautulli/Tautulli/wiki/Tautulli-API-Reference
