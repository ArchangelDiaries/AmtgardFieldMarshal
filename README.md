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

## Setup

### 1. Create a Firebase project
1. Go to <https://console.firebase.google.com> and sign in with the Google account that should own Field Marshal.
2. Click **Create a project**. Name it something like `field-marshal`. You can turn Google Analytics off.
3. Stay on the free **Spark** plan. A tournament uses a tiny fraction of its limits.

### 2. Connect the app to the project
1. On the project's home page, click the **Web** icon (`</>`) to add a web app. Name it `Field Marshal`. Skip "Firebase Hosting" for now.
2. Firebase shows a block of settings that starts with `const firebaseConfig = {`.
3. Open `config.js` in any text editor (Notepad or TextEdit is fine). Replace everything between the `{` and `}` with the values Firebase showed you, then save.

### 3. Turn on the database
1. In the left menu choose **Build → Firestore Database → Create database**.
2. Pick a location near you (for example `us-west2`), then choose **Start in production mode**.

### 4. Add the security rules
1. In Firestore, open the **Rules** tab.
2. Delete what's there, paste in everything from `firestore.rules`, and click **Publish**.

### 5. Turn on Google sign-in
1. Choose **Build → Authentication → Get started**.
2. Under **Sign-in method**, pick **Google**, switch it on, choose a support email, and save.

### 6. Make yourself the first marshal
1. Go back to **Firestore Database → Data** and click **Start collection**.
2. Collection ID: `marshals`
3. Document ID: your Google email address, **all lowercase** (for example `antifreke@gmail.com`).
4. Add one field: name `email`, type `string`, value your email. Click **Save**.

After this you can add every other marshal from inside the app.

### 7. Put the app online (Netlify, free)
1. Go to <https://app.netlify.com/drop> and sign up or log in.
2. Drag this whole folder onto the page. Netlify gives you a web address like `random-name-123.netlify.app`.
3. Under **Site configuration → Change site name**, pick something memorable, such as `field-marshal-stone-rivers`.

When you change a file later (for example a new version of `index.html`), open the site in Netlify, go to **Deploys**, and drag the folder in again.

### 8. Allow that web address to sign in
1. In Firebase, go to **Authentication → Settings → Authorized domains → Add domain**.
2. Add your Netlify address (for example `field-marshal-stone-rivers.netlify.app`).

### 9. First sign-in and import
1. Open your Netlify address and click **Marshal sign-in**.
2. On the **Signups** tab, scroll to **Field Marshal settings**.
3. Under **Import a Field Marshal backup**, choose `field-marshal-backup.json` to bring over the tournaments, fighters and results from the Claude version. It includes the sample "Harvest Tourney"; delete that from its Tournament settings when you don't need it.
4. Click **Refresh park rosters from the ORK** to load persona suggestions.

### 10. Link it from the Wix site
In the Wix editor, add a button or menu item that links to your Netlify address. Use a link rather than embedding the page in a Wix frame, because Google sign-in doesn't work reliably inside embedded frames.

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

## Updating from an earlier version

If you already set up Field Marshal before the Players and Parks tabs existed, paste the new `firestore.rules` into Firestore → Rules and click **Publish** again (it adds the tournament history). Then drag the folder into Netlify's Deploys tab as usual. History for past tournaments builds itself the first time a marshal opens the site.

## Good to know

- **Who can change things:** only marshals. Signed-out visitors can view and send signup requests. Award recommendations and the marshal list are visible to marshals only.
- **ORK lookups** go through your Netlify site (the `_redirects` file) to `ork.amtgard.com`, because the ORK doesn't let other websites read it from a browser. If you host somewhere other than Netlify, lookups may show "Couldn't reach the ORK"; signups still work by typing the persona or pasting the ORK profile link.
- **Free-plan limits:** the Spark plan allows 50,000 reads and 20,000 writes a day. Every person with the page open reads the tournament data once and then only receives changes, which is well inside the limit for a park or principality event.
- **Backups:** Firebase keeps the data. To keep your own copy, use Firestore's export, or ask Claude to export it for you.


## Links with FORK (event management)
- Open a tournament directly: `https://srfieldmarshal.netlify.app/?t=<tournament id>`. Add `&tab=signups` (or pits, brackets, board, players, parks, awards) to open a tab. The address bar updates as you switch tournaments, so you can copy it to share or to link a tournament in FORK.
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
- The key goes only in the `X-Ork-Key` header. `X-ORK-Client` is `FieldMarshal/1.1`.
