# Field Marshal
*A Digital Combat Scribe for Tournament Management*

Field Marshal runs Amtgard fighting tournaments: signups, timed winner-stays pits (bout by bout or by reeve tally), top-four brackets for Single Short, Sword & Board, Florentine, Heavy Weapons and Open Class, a live leaderboard with streaks, and Order of the Warrior recommendations checked against each fighter's ORK record.

- **Anyone with the link** can watch pits, brackets and standings live, and can send a signup for a tournament.
- **Marshals** sign in with Google to run the lists: approve signups, log pits, pick bracket winners, and handle award recommendations.

It's a single web page backed by a free Google Firebase database. Setup takes about 20 minutes and doesn't need any coding.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The app. |
| `config.js` | Where your Firebase settings go (step 2). |
| `firestore.rules` | The security rules that decide who can read and change what (step 4). |
| `field-marshal-backup.json` | Everything entered so far in the Claude version, ready to import (step 9). |
| `_redirects` | Tells Netlify to relay ORK lookups, since the ORK won't answer other websites directly. Keep it in the folder. |
| `firebase.json` | Only needed if you host with Firebase Hosting instead of Netlify. |


## Running a tournament

- **Create it:** sign in as a marshal, then New tournament (next to the tournament picker) → name, date, host park, level (Shire, Barony, Duchy, Kingdom or Major kingdom), pit length, divisions.
- **Format:** choose it in the Format dropdown next to the tournament name when you create it. **Pool and Bracket** is a timed winner-stays pit for each division, then the top 4 fight a bracket. **Bracket** skips the pit: on the Brackets tab, **Draw bracket** puts every fighter in the division into a random single-elimination bracket (byes go to the top of the draw), and the semifinal losers fight for 3rd. **Redraw bracket** reshuffles, asking twice if results would be lost. The format can be changed in Tournament settings until any results are entered.
- **Signups:** players use "Sign up to fight" on the Signups tab, and their requests wait at the top of the tab for a marshal to approve. Marshals can also add fighters directly. "Search the ORK" finds a player's ORK profile by persona. Turn player signups off in Field Marshal settings once the lists close.
- **Pits:** each division has a shared clock. Choose **Log each bout** (tap who fought and who won; tracks win streaks) or **Reeve tally** (enter each combatant's total pit wins). **Close pit and seed top 4** builds the bracket.
- **Brackets:** tap a fighter's name to mark the winner of each match. 1st, 2nd and 3rd earn 5, 3 and 1 points.
- **Finalize:** once every division with two or more fighters has its 1st, 2nd and 3rd decided, the Brackets tab unlocks **Finalize tournament**. It locks the pits and brackets, stops the clocks, closes player signups and saves the final results to history. **Reopen tournament** undoes it if something needs fixing.
- **Leaderboard:** this tournament or all tournaments, any division, with or without pit kills counted.
- **Players:** search any fighter to see their totals, podiums, best win streak, a points-per-tournament chart (filter by division, or switch to pit kills), a by-division breakdown, and every tournament they've fought in.
- **Parks:** pick a host park to see how many tournaments it has run, turnout per tournament, fighters per division, each division's champion, and who has won and attended most there.
- **Awards (marshals only):** each fighter's Order of the Warrior level loads from the ORK. Fighters who earned a higher level (by consecutive wins or placement, per the Rulebook 8.08 award standards) are flagged, and you can mark each recommendation Submitted or Dismissed. Next to each flagged fighter, **Recommend in ORK** copies a ready-made reason and opens their ORK profile. There, choose Recommend, pick Order of the Warrior and the level, paste the reason, then mark it **Submitted** in Field Marshal.
- **Send straight to the ORK:** at the top of the Awards tab, sign in with your own ORK username and password. Each flagged fighter then gets a **Send Warrior N to ORK** button (tap twice to confirm). It files the recommendation in the ORK under your name with the reason filled in, and marks it **Sent to ORK** in Field Marshal. Your password is sent privately to the ORK through the site's relay, never saved, and never put in a web address. The ORK sign-in lasts until you reload or close the page, and **Sign out of the ORK** ends it right away. Only fighters whose current Warrior level has loaded from the ORK can be sent, because the ORK needs the exact level.

## Arts & Sciences (Dragonmaster) events

Field Marshal also runs A&S tournaments. In **New tournament**, set **Type** to **Arts & Sciences (Dragonmaster)**, then choose:
- the **score range** judges use (for example 1 to 5), always in .25 steps
- how many **sub-categories count** toward a player's Dragonmaster score (Westmarch midreign counts 5)
- the **award threshold**, the average at or above which an entry is flagged for an award recommendation
- which of the 32 **sub-categories** are offered (Garb, Art, Literature, Cooking, Construction, Bardic, Rose)

An A&S event has its own tabs:
- **Entries:** anyone can submit an entry without an account: persona (with "Find me in the ORK"), park, sub-category, title, a documentation writeup and up to 5 links to photos or documents. Each entrant gets a **private feedback link** to save. Marshals can move an entry to another sub-category or withdraw it.
- **Judging:** the A&S Crat (any marshal) adds judges by Google email and can limit each judge to certain categories. Judges sign in with **Sign in**, see only the entries they judge, and enter a score in the event's range plus written feedback for each one. Judges never see each other's scores. The crat sees scoring progress for every entry.
- **Scores:** Dragonmaster standings (the sum of each player's best average per sub-category, top N sub-categories) and results by sub-category. An entry's average is the mean of its judges' scores; when 5 or more judges score an entry, the single highest and single lowest scores are dropped first. The public sees them once the event is finalized, or earlier if you tick "Show scores to everyone before finalizing". **Finalize event** locks scoring, closes entries, and publishes each entrant's scores and feedback to their private link, with judges shown as Judge 1, Judge 2 and so on.
- **Awards:** entries at or above the threshold flag the next level of their order: Garb → Garber, Art / Literature / Cooking / Bardic → Dragon, Construction → Owl, Rose → Rose. It's one flag per player per order, from their best entry. **Send to ORK**, **Recommend in ORK**, and **Submitted** / **Dismiss** work the same as combat awards. Current levels load from each entrant's ORK profile when they give an ORK ID.

**Updating from an earlier version:** paste the new `firestore.rules` into Firestore → Rules and **Publish**. The A&S tabs need the new rules for entries, judges, scores and feedback.

## Updating from an earlier version

If you already set up Field Marshal before the Players and Parks tabs existed, paste the new `firestore.rules` into Firestore → Rules and click **Publish** again (it adds the tournament history). Then push the new files to GitHub. History for past tournaments builds itself the first time a marshal opens the site.

## Good to know

- **Who can change things:** only marshals. Signed-out visitors can view and send signup requests. Award recommendations and the marshal list are visible to marshals only.
- **ORK lookups** go through your Netlify site (the `_redirects` file) to `ork.amtgard.com`, because the ORK doesn't let other websites read it from a browser. If you host somewhere other than Netlify, lookups may show "Couldn't reach the ORK"; signups still work by typing the persona or pasting the ORK profile link.
- **Free-plan limits:** the Spark plan allows 50,000 reads and 20,000 writes a day. Every person with the page open reads the tournament data once and then only receives changes, which is well inside the limit for a park or principality event.
- **Backups:** Firebase keeps the data. To keep your own copy, use Firestore's export, or ask Claude to export it for you.


## Battle of the Bards

For the Bardic College's Battle of the Bards, set **Type** to **Battle of the Bards** in **New tournament** and enter the **head judge**'s Google email (they break tied votes; you can change it later on the Judging tab).

- **Bards tab:** bards sign in with Google and enter with their persona, park and ORK profile ("Find me in the ORK"). The ORK profile is what lets you send Order of the Dragon recommendations for them. The same sign-in lets them post their performance each round.
- **Judging tab (organizer):** add each Ollamh judge by their Google email. Judges sign in with **Sign in**.
- **Bracket tab:** after signups, **Draw bracket** closes signups and places bards at random in a single-elimination bracket (byes go to the top of the draw). Then, for each round:
  1. **Open entries.** Each bard still in the bracket posts a Google Drive link to their performance, with an optional title, on the Bards tab. Ask them to set the file to "Anyone with the link can view."
  2. **Close entries and open voting.** On the Judging tab, each judge votes for a winner in every match. They can also flag either bard for the Order of the Dragon and vote for the round's **Judges' Choice**.
  3. **Close the round and count votes.** The bard with the most votes advances. Tied votes, including a tied Judges' Choice, go to the head judge, who picks on the Judging tab.
  4. **Start the next round**, and repeat until the final is decided, then **Finalize event**.
- **Public view:** anyone can see the bracket, each performance link, the vote counts once a round closes (tie-breaks are marked "head judge"), each round's Judges' Choice, and the champion. Judges' individual ballots stay private.
- **Awards tab (organizer):** every bard a judge flagged for the Order of the Dragon, or who was named Judges' Choice, is listed whether or not they won. It shows their current Dragon level from the ORK and recommends the next one, with the same **Send to ORK**, **Recommend in ORK**, and **Submitted** / **Dismiss** buttons as the other awards.

**Updating from an earlier version:** paste the new `firestore.rules` into Firestore → Rules and **Publish**. Battle of the Bards needs the new rules for bards, performance links, ballots and the bracket.


## Kingdoms

Field Marshal serves more than one kingdom. It currently knows the **Kingdom of Westmarch** (with the Principality of Stone Rivers) and the **Kingdom of Neverwinter**, with each kingdom's active parks from the ORK.

- **Kingdom picker:** the dropdown left of the event list filters events by kingdom (or "All kingdoms"). Each visitor's browser remembers their choice. The header shows the selected event's kingdom.
- **New events:** choose the **Kingdom** first. The park suggestions and the default tournament level (Duchy, Barony or Shire, from the park's ORK rank) follow that kingdom. Events created before this update, and events created from FORK, count as Westmarch.
- **Players, Parks and "All tournaments"** only include events in the kingdom you've picked.
- **ORK rosters:** **Refresh park rosters from the ORK** loads the active players of every park in the selected event's kingdom, and keeps the other kingdoms' players. ORK searches list players from that kingdom first.

**Marshals are per kingdom.** Each marshal entry lists the kingdoms that person can manage. They can see every kingdom's events, but only create or change events in their own. When you add a marshal in Field Marshal settings, tick their kingdom(s). A marshal can only add or remove marshals for kingdoms they cover; a marshal set to **All kingdoms** can manage every kingdom and add anyone.

**One-time step for the site owner:** existing marshal entries have no kingdom list, so they count as Westmarch only. To make yourself a marshal for all kingdoms, open Firebase → Firestore Database → Data → `marshals` → your email. Add a field named `kingdoms` of type **array** with one string item, `*`, and save. Then publish the new `firestore.rules` (Firestore → Rules → Publish), which enforce the kingdom limits.

**Adding another kingdom later** is a small code change: its ORK kingdom ID and active parks go in the `KINGDOMS` list at the top of the app.

## Links with FORK (event management)
- Open a tournament directly: `https://srfieldmarshal.netlify.app/?t=<tournament id>`. Add `&tab=signups` (or pits, brackets, board, players, parks, awards; for A&S events entries, judging, asboard, asawards; for Battle of the Bards bbenter, bbbracket, bbjudge, bbawards) to open a tab. The address bar updates as you switch tournaments, so you can copy it to share or to link a tournament in FORK.
- Tournaments created from FORK carry `fork: { eventId, name, url }`. The tournament header shows "Part of <event>" with a link back to the FORK event page.
- No rule changes are needed: marshals can already write any tournament field, and FORK's signup requests use the existing `requests` format.

## ORK access (API key), added 2026-09-26
The ORK is now behind Cloudflare's bot check, which blocks the old `_redirects` relay. The ORK team issues each application a private key for its web service. Field Marshal now sends ORK requests through a small Netlify Function, `netlify/functions/ork-api.mjs`, which adds the key. The page still calls `/ork-api` exactly as before.

**One-time setup**
1. **Move off drag-and-drop:** Netlify Drop doesn't deploy functions. Put this folder in a GitHub repo, as with FORK. Then choose **Add new site → Import from Git**, or link the existing srfieldmarshal site under **Site configuration → Build & deploy → Link repository**. `netlify.toml` already sets publish = "." and the functions folder.
2. **Add the key:** go to **Site configuration → Environment variables** and add `ORK_API_KEY` with Field Marshal's own key from the ORK team. Mark it secret and give it the **Functions** scope. Optionally add `ORK_CONTACT` with a contact email. Never put the key in `config.js` or anywhere in the repo.
3. **Deploy.** To test, open the Signups tab, type a persona and click search. ORK results should appear.

**Safety built into the function**
- It only forwards the six ORK calls Field Marshal uses: player search, active players, awards, sign-in, sign-out and award recommendation. It only answers pages on this site, so nobody else can borrow the key.
- ORK sign-in, sign-out and recommendations must be sent as POST, so passwords and session tokens stay out of URLs and logs, as the ORK team asks.
- The key goes only in the `X-Ork-Key` header. `X-ORK-Client` is `Field Marshal/1.0`.

## Kingdom and park heraldry
The header shows the crest of the kingdom you're looking at, and the Parks tab shows each park's heraldry. Both load from the ORK by ID, so updates made in the ORK show up on their own.
To use your own image for a kingdom instead, put it in a `logos` folder next to index.html, named after the kingdom: `logos/westmarch.png`, `logos/neverwinter.png` (.jpg also works). A park override is `logos/park-<ORK park ID>.png`, used only if the ORK has none. If no image loads, the crest simply isn't shown.

## Persona lookup
- When a marshal opens any event, Field Marshal refreshes that kingdom's persona list from the ORK if it's missing or more than two weeks old. It asks the ORK for the kingdom's current parks (Kingdom/GetParks), so new parks are included. "Refresh park rosters" in the Signups tab of a fighting event does it on demand.
- Entrants can choose their park first: a list of that park's ORK players appears, and picking their name fills in their ORK ID. If the saved list doesn't have that park, the app asks the ORK for it directly.
- "Find me in the ORK" ranks matches from the chosen park first, then the event's kingdom.
- Kingdom/GetParks was added to the relay allowlist in netlify/functions/ork-api.mjs.
