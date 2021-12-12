---
layout: post
title:  "FreeBSD Ports :: Patching Privately :: Notes on privately patching ports"
date:   2021-12-11 17:00:03 -0700
categories: jekyll update
---
### Intro to the problem.
- Plex reports a new versions of the server. The FreeBSD port maintainer has not updated the port yet.
  - Eventually I'd like to be able to submit patches to help out. But for now; I whipped up a script to do it for me privately.
  - This is by no means the best solution, it's just how I've chosen to do it until I figure out the "proper way", I am certain it is by no means the only way to solve the problem.
  - This post serves to document my quick scratch program; the thought processes behind it (to better understand what I did, and what materials I referenced), so I can make changes in the future and make it better. This is just the initial version, there are already changes I am planning on doing as this script makes a lot of assumptions about its environment.

  *NOTE: I plan to place this whole project in a GitHub Repository*

---

### API Call: To Tautilli - get plex version.

- The first thing I need to be able to detect in my script is - if a new version of plex has been released.
 - There is a notification in plex; likely there is a way to pull the information directly from the server via an API call. I just chose to use [Tautulli] and it's exposed API. I had just finished setting it up.
 - The [Tautulli] API Documentation is located: [Tautulli-API-Reference].
 - The script is written in `/usr/bin/env sh` the default shell on Freebsd. I'm sure it could be ported to many other languages.


- *Set Script Variables -> place in `settings.conf`*
  - ```
  apikey=yourAPIKEYtoTautulli
  cmd=get_pms_update
  url=172.16.0.1
  port=8181
  distfiles=/usr/ports/distfiles
  ports_dir=/usr/ports/multimedia/plexmediaserver-plexpass
  email=youremail@gmail.com
  name=yourname
 ```
  - *NOTE: Remember to replace the settings with your own*

- These variables are set at runtime from a `settings.conf`, and the script is executed by setting an alias in `~/.cshrc` or run directly.
  - ```
  alias ppp       'env `cat /root/plex-ports-patch/settings.conf` /bin/sh /root/plex-ports-patch/plex-patch.sh'
  ```

- Make the call to the API endpoint using curl, set it as a variable 'json'.
  - `json=$(curl -s -X GET "http://$url:$port/api/v2?apikey=$apikey&cmd=$cmd")`
- The response comes back from the API endpoint as json. It now needs to be parsed for the information needed.
- This can be done by piping the JSON through [jq] a 'Command-line JSON processor' (according to it's manual page).
  - The pieces of information I need to get and set as variables in my script are as follows.
    - The full call I use is listed, these may need to be tweaked.

    *(NOTE: I'm using xargs to make sure there's no junk or newline characters, etc floating around - probably not needed but in a quick and dirty script like this it eliminates points of failure. Then it can be optimized.)*
    - `update_available'` - Which is a true or false value.
      - `update_available=$(echo $json | jq '.response.data | {update_available}' | jq '.update_available')`
    - `download_url` - The URL the new file is located.
      - `download_url=$(echo $json | jq '.response.data | {download_url}' | jq '.download_url' | xargs)`
    - `version` - The version number separated by a '-' a 'prefix' and a 'suffix'.
      - `version=$(echo $json | jq '.response.data | {version}' | jq '.version' | xargs)`
    - `release_date` - The release date.
      -  `timestamp=$(echo $json | jq '.response.data | {release_date}' | jq '.release_date' | xargs)`
  - Another bit of information needed is the version prefix and suffix, this can be generated from the version string by splitting it in half using the '-' as a delimitator and storing each in its own variables for ease of use later.
    - `version_prefix=$(echo $version | cut -f 1 -d '-' | xargs)` For the version prefix.
    - `version_suffix=$(echo $version | cut -f 2 -d '-' | xargs)` For the version suffix.
---
### A quick and dirty copy of the remainder of the script.

```
if [ "$update_available" == 'true' ]
then

# Makefile Changes
if [ -e $ports_dir/Makefile ]
then
echo "Makefile exists, creating backup."
cp $ports_dir/Makefile $ports_dir/Makefile.orig

        sed -e "s/Created by.*/Created by: $name <$email>/g" \
        -e "s/PORTVERSION=.*/PORTVERSION=\t"$version_prefix"/g" \
        -e "s/DISTVERSIONSUFFIX=.*/DISTVERSIONSUFFIX="$version_suffix"/g" \
        -e "s/MAINTAINER=.*/MAINTAINER=\t"$email"/g" $ports_dir/Makefile > $ports_dir/Makefile.new

        mv $ports_dir/Makefile.new $ports_dir/Makefile
fi
# Generate distinfo

        # aria2c multi threads and connections.
#       aria2c -s16 -x16 --dir=$distfiles -c $download_url
        cd $ports_dir && make makesum
else
        echo "Plex is running $version, no update needed."
fi
```
- *NOTE: This script may not be the latest version and is here just as a reference. Check out my GitHub for full version.*

- The use of `aria2c` can be toggled on and off in this script by removing the #, doing so lets me resume broken downloads. Plex servers are usually slow.
- `make makesum` needs to be run to generate the file checksums. It will actually check and download the file if it's not present in the $distfiles directory.
- If your plex server is running inside of a jail managed by `cbsd`, you can run these commands to kick off the build using `synth`.
  -
```
cbsd jexec jname=plex synth install multimedia/plexmediaserver-plexpass
cbsd jexec jname=plex service plexmediaserver_plexpass status
cbsd jexec jname=plex service plexmediaserver_plexpass stop
cbsd jexec jname=plex service plexmediaserver_plexpass start
cbsd jexec jname=plex service plexmediaserver_plexpass status
```

 [jq]: https://stedolan.github.io/jq/
[Tautulli]: https://tautulli.com/
[Tautulli-API-Reference]: https://github.com/Tautulli/Tautulli/wiki/Tautulli-API-Reference
