# wstunnel

A WebSocket based tunnel.

The projected is hosted in [github](https://github.com/mhzed/wstunnel).  

The inspiration behind this project was to circumvent strict firewalls that does packet level inspections to block connections.  A lot of corporate intranets and some countries do this.  WebSocket is part of HTML5 standard and blocking it would mean crippling the web, thus tunneling via WebSocket should be difficult if not impossible to block.  As a side-effect, wstunnel also works pretty well to obfuscate the real VPN or SSH traffic.