---
layout: post
title:  "Fetching FAA airport status in python"
date:   2016-12-11 19:50:30 -0400
categories: python
---

I wrote some code to fetch airport status from the FAA's airport status
API.

Here's [the repo](https://github.com/jakekara/faa-airport-status.py).

The [API](http://services.faa.gov/docs/services/airport/#airportStatus) itself is pretty minimal.

You can get XML or JSON, but I'm just interested in JSON.

### Files

There are two "library" files that can be used in your code, and two
command line scripts. 

These are the two libraries:

* airports.py - Contains a list of (airport code, airport name), and a method
for performing a simple kkeyword search of airports (the search() method)

* airportstatus.py - Performs API calls with the get_status() method. 

These are the two command line tool examples:

* getall.py - Get status of all airports in the airports.py list and save
  them to all.json. Usage:

  {% highlight javascript %}
  getall.py
  {% endhighlight %}

* getstatus - Get the the status of one airport and print to stdout. Usage:

{% highlight javascript %}
    getstatus.py BDL
    {
      "status": {
        "minDelay": "", 
        "maxDelay": "", 
        "trend": "", 
        "reason": "No known delays for this airport.", 
        "closureEnd": "", 
        "avgDelay": "", 
        "closureBegin": "", 
        "endTime": "", 
        "type": ""
      }, 
      "ICAO": "KBDL", 
      "name": "Bradley International", 
      "city": "Windsor Locks", 
      "IATA": "BDL", 
      "delay": "false", 
      "state": "Connecticut", 
      "weather": {
        "wind": "Northwest at 3.5mph", 
        "weather": "Mostly Cloudy", 
        "meta": {
          "url": "http://weather.gov/", 
          "credit": "NOAA's National Weather Service", 
          "updated": "4:51 PM Local"
        }, 
        "temp": "40.0 F (4.4 C)", 
        "visibility": 10.0
      }
    }
{% endhighlight %}
