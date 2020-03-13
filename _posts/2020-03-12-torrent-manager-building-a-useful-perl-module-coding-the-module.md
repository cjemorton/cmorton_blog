---
layout: post
title:  "Torrent Manager :: Building a useful perl module :: Coding the Module!"
date:   2020-03-12 10:52:59 -0700
categories: jekyll update
---
Recently I've been throwing together some perl code to help manage and run query's on my [rtorrent][rakshasa-rtorrent] installation.

I'll try to document the steps here in a series of blog posts. This post is for my own use, and may be lacking in clarity in some places. 

NOTE: These scripts and code snippets are not a "complete project". They are probably not what your looking for.
If you do happen to find pieces here and there useful. That's awesome! Have fun!

- [rtorrent][rakshasa-rtorrent] is the BitTorrent Client.
- [ruTorrent][novik-rutorrent] is the web frontend for rtorrent.


To get my perl scripts talking to rTorrent/ruTorrent XML-RPC communication is needed. 
To accomplished this the Perl module [XML::RPC][xml-rpc] is used. It provides simple "Pure Perl" methods for XML::RPC communication.

Assuming perl and cpan are setup.
{% highlight bash %}
sudo cpan install XML::RPC Data::Dumper
{% endhighlight %}

This will install the `XML::RPC` and `Data::Dumper` perl modules into your environment. The `Data::Dumper` module is used for testing.

---
A bit of information is needed to connect to your rtorrent installation.
- The User you login to ruTorrent with. : `user`
- The Password you login to ruTorrent with: `password`
- The Host url your installation is running on: `rtorrent.example.com`
- The Port, if your site is running `https` and it probably is. This port will be `443` as https communicates over that port.
- The Endpoint: `RPC2` in my case. This may change depending on how rtorrent and ruTorrent are setup.
-- To setup your endpoint you can look at [RPC-Setup-XMLRPC][rpc-setup-xmlrpc] from the makers of rtorrent.

---
The script is provided with these bits of information at runtime, to avoid storing anything hardcoded into the scripts.
The command to run the script looks like this.
{% highlight bash %}
perl rtgen-db.pl user password rtorrent.example.com 443 RPC2
{% endhighlight %}
Assuming the script is called `rtgen-db.pl`

Inside the script these command line switches are "caught" with the variable `$ARGV[]`. Keep in mind it's zero indexed. ex. `$ARGV[0]` will be `user`.

The script will look like this.

{% highlight bash %}
my $user = $ARGV[0]; # User.
my $pass = $ARGV[1]; # Password.
my $host = $ARGV[2]; # Host
my $port = $ARGV[3]; # Port
my $endp = $ARGV[4]; # Endpoint.
{% endhighlight %}

From here each variable can be used in a script. 
(Technically each $ARGV[] variable can be used as well. I've written it out here for clarity.) 
I have included an alternative to clean up and minimize code clutter.

The string that is used to genearate a useable "url" is:

{% highlight bash %}
"https://$user\:$pass\@$host\:$port\/$endp"
{% endhighlight %}
- Alternative url, after tweaking and calling `$ARGV[]` directly is:.
{% highlight bash %}
"https://$ARGV[0]\:$ARGV[1]\@$ARGV[2]\:$ARGV[3]\/$ARGV[4]"
{% endhighlight %}

---
To call the `XML::RPC` library make sure it's listed at the top of the script. `use XML::RPC;` and call it with.
{% highlight bash %}
my $xmlrpc = XML::RPC->new("https://$user\:$pass\@$host\:$port\/$endp");
{% endhighlight %}
- Alternative complete call is:
{% highlight bash %}
my $xmlrpc = XML::RPC->new("https://$ARGV[0]\:$ARGV[1]\@$ARGV[2]\:$ARGV[3]\/$ARGV[4]");
{% endhighlight %}
---
Now that we can communicate with rtorrent. We need to know what say, and what to ask it.
Here we build on the wonderful work done by the github user `mdevaev` on the project `emonoda`. - Which they picked up from [gi-torrent]

They have done a wonderful job documenting and compiling it into a nice format for me to easilly read. 

Reference:

I find it here: [rtorrent-xmlrpc-reference]

---

The call that I am interested in at the moment is. `download_list`

Passed to the `XML::RPC` library the call looks like this.

{% highlight perl %}
my $dl_list = $xmlrpc->call( 'download_list' );
{% endhighlight %}

---
From here the script will connect to the server and get the hashes of all the torrents.

Now I have chosen to setup a foreach loop to loop over all the results returned from the call and get the name of the torrent associated with it.
{% highlight perl %}
foreach my $i () {
//get the name of the torrent from the server.//
}
{% endhighlight %}

That code looks like this.
{% highlight perl %}
foreach my $i (@{ $dl_list}) {
        my $name = $xmlrpc->call( 'd.get_name',$i );
        print "$name\n";
}
{% endhighlight %}

The call used is `d.get_name` from: [rtorrent-xmlrpc-reference]

This loops over each torrent hash and returns the name of it.

---
From here. It takes quite awhile to run this program, there is a lot of communication going on. The next step is to find a way to store that information locally.
So it can be used in further scripting - filtering. And other such routines, etc.

The data structure that I will be using is an Associative Array.

The final snip of code is:
{% highlight perl %}
my %hash_name = ();
foreach my $i (@{ $dl_list}) {
        my $name = $xmlrpc->call( 'd.get_name',$i );
        print "$name\n";
        $hash_name{$i} = "$name";
}
{% endhighlight %}

---
The next big step is finding a way to store that data locally, this is done through the use of a local database.

There is a very nice little article over at the [Linux Journal][linux-journal-1381] which talks about Creating and Using a Database with Perl.

The snip of code used to open and create a database is as simple as (mud?) here it is:
{% highlight perl %}
tie (%hash_name_db, DB_File, "hash_name.db", O_CREAT|O_RDWR, 0644) ||
        die ("Cannot create or open hash_name.db");
{% endhighlight %}

Make sure to close the database and write everything at the end.
{% highlight perl %}
untie(%hash_name_db);
{% endhighlight %}

The interesting point to note here is the `%hash_name` variable in the foreach loop is writing these results to a memory location.
Instead one can write them directly to file, using `%hash_name_db` instead of `%hash_name`

The full snip of code is:

{% highlight perl %}
tie (%hash_name_db, DB_File, "hash_name.db", O_CREAT|O_RDWR, 0644) ||
        die ("Cannot create or open hash_name.db");

print "Building Database...\n";
foreach my $i (@{ $dl_list}) {
	my $name = $xmlrpc->call( 'd.get_name',$i );
        print "$name\n";
        $hash_name_db{"$i"} = $name;
}
{% endhighlight %}

* Theres a few print statements thrown in just for clarity on what's going on.

---

All thats left is to call the database, sort it and print it out.

That can be done with this snip of code:

{% highlight perl %}
foreach (sort keys %hash_name_db) {
    print "$_ : $hash_name_db{$_}\n";
}
{% endhighlight %}

Don't forget to close the file afterwards with:

{% highlight perl %}
untie(%hash_name_db);
{% endhighlight %}

---

The full functional script with no frills.:

{% highlight perl %}
#!/usr/bin/perl
# https://github.com/rakshasa/rtorrent/wiki/RPC-Setup-XMLRPC
# https://mdevaev.github.io/emonoda/rTorrent-XMLRPC-Reference/
# https://www.linuxjournal.com/article/1381
use XML::RPC;
use Data::Dumper;
use DB_File;
use Fcntl;

# Run Example: perl rtgen-db.pl user pass host port endpoint
my $xmlrpc = XML::RPC->new("https://$ARGV[0]\:$ARGV[1]\@$ARGV[2]\:$ARGV[3]\/$ARGV[4]");
my $dl_list = $xmlrpc->call( 'download_list' );
tie (%hash_name_db, DB_File, "hash_name.db", O_CREAT|O_RDWR, 0644) ||
        die ("Cannot create or open hash_name.db");
foreach my $i (@{ $dl_list}) {
	my $name = $xmlrpc->call( 'd.get_name',$i );
        print "$name\n";
        $hash_name_db{"$i"} = $name;
}
foreach (sort keys %hash_name_db) {
    print "$_ : $hash_name_db{$_}\n";
}
untie(%hash_name_db);
{% endhighlight %}

---
Now comes the hardest part. Deciding on a name for this perl module to include it in cpan.

The name that I settled on is: `Rtmgr::Gen::Db` as to if that's a "good name" i'm not sure.
The reasons why I chose it were.
- Its namespace that's not already used.
- `rt` stands for rT(orrent), and `mgr` stands for Manager. As this is a type of manager for rTorrent.
- The `Gen` part of the namespace looks generating Database files.

All these pieces might change up as I work on the functionality of the module. This is however a starting point for now.

---


[linux-journal-1381]: https://www.linuxjournal.com/article/1381
[rakshasa-rtorrent]: https://github.com/rakshasa/rtorrent
[novik-rutorrent]: https://github.com/Novik/ruTorrent
[xml-rpc]: https://metacpan.org/pod/XML::RPC
[rpc-setup-xmlrpc]: https://github.com/rakshasa/rtorrent/wiki/RPC-Setup-XMLRPC
[rtorrent-xmlrpc-reference]: https://mdevaev.github.io/emonoda/rTorrent-XMLRPC-Reference/
[gi-torrent]: https://code.google.com/p/gi-torrent
