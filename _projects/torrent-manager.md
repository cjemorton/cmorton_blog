---
layout: project
title: "Torrent Manager Perl Module"
date: 2020-03-12
excerpt: "A Perl module for managing and querying rtorrent installations via XML-RPC communication."
tags: [perl, xml-rpc, rtorrent, automation]
github_url: "https://github.com/cjemorton"
---

## Overview

This project provides a Perl module to manage and run queries on rtorrent installations. It uses XML-RPC communication to interact with the rtorrent/ruTorrent web frontend.

## Features

- XML-RPC communication with rtorrent
- Query torrent information
- Manage torrent operations
- Pure Perl implementation
- Easy command-line interface

## Technologies Used

- Perl
- XML::RPC module
- Data::Dumper for debugging

## Installation

```bash
sudo cpan install XML::RPC Data::Dumper
```

## Usage

```bash
perl rtgen-db.pl user password rtorrent.example.com 443 RPC2
```

## Status

Active development - useful code snippets and modules for personal use.
