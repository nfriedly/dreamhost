# DreamHost JavaScript API Client

Modules amd method names are essentially camelCased versions of [DreamHost's](https://www.dreamhost.com/r.cgi?225072) commands, see
https://help.dreamhost.com/hc/en-us/sections/203903178-API-Application-Programming-Interface-

Library should work unmodified in browsers if DreamHost ever decides to support CORS.

Library and readme are automatically generated based on the output of the `api-list_accessible_cmds` meta-command.
The src/ directory is the generator, the actual code and a more useful readme are in dist/.

## Important Note:

After this library was created, Dreamhost removed the majority of their API, including commands to manage your account, domain, mail, databases, rewards, and users.

Currently, only DNS and Anouncement Lists management are functional.

## Usage

See [dist/README.md](dist/README.md).

---

Todo:
* complete api docs in readme
* flesh out type handling - e.g. parse numbers, automatically create Date objects, etc.
* scrape api docs to obtain missing info (?)
