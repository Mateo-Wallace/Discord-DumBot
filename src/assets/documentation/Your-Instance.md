<a name="readme-top"></a>

[![Home Shield](https://img.shields.io/badge/%E2%86%90_Home-345289?&style=for-the-badge)](../../../README.md)

# Host & Deploy Your Own Instance of DumBot

This document will set you up to have your own version of DumBot that you can fully customize the code of. This documentation will go super in depth so even if you have no coding knowledge you should be able to figure it out. Feel free to open a [discussion](https://github.com/Mateo-Wallace/MP2-Discord-DumBot-V2/discussions) if you are having problems.

> **Note**
>
> Be aware before going through this process my solution to deploying is hosting on [Heroku](https://www.heroku.com/pricing) which is a **PAID** service. I researched into free solutions like [Glitch](https://glitch.com/pricing) but was unable to make it work. Heroku costs $5 for the lowest tier plan. That plan will put DumBot into sleep mode after 30 minutes. For $7 you can bump up your plan and have DumBot running at all times.
>
> If you find a way to run DumBot for free, even if it goes into sleep mode, that information would be amazing! Feel free to message me or open a discussion and I will add you as a contributor to the project.

### Table Of Contents

- [Setting Up A Discord Bot](#setting-up-a-discord-bot)
- [Forking The Repo](#forking-the-repo)
- [Customizing The Code](#customizing-the-code)
  - [The Bare Minimum Requirements](#the-bare-minimum-requirements)
  - [Playing With The Config File](#playing-with-the-config-file)
  - [Advanced Development (New Commands) IN DEVELOPMENT](#advanced-development-new-commands)
- [Deploy Through Heroku](#deploy-through-heroku)

## Setting Up A Discord Bot

Setting up a Discord Bot is extremely well detailed through the [Official Discord Developer Portal Documentation](https://discord.com/developers/docs/getting-started). Feel free to follow along both here and on those docs in order to accomplish setting up your bot.

1. Go to the [Discord Dev Portal Applications Tab](https://discord.com/developers/applications) and sign in if you aren't already. It should look something like this:

   ![dev portal applications tab](../images/discord-dev-applications-tab.png)

1. From that screen in the top right corner you should see a button called `New Application`. It's circled in red on the image above. Click that button and fill out the Name of your bot and agree to their terms of service. Then hit the `Create` button:

   ![creating a new bot](../images/discord-dev-new-bot.png)

   Now you will be presented with a screen where you can customize the bot, the `General Information Tab`. Feel free to play around with settings such as `App Icon`, `Description`, and Tags. Nothing on this page is vital to our purposes.

1. On the left hand side of the screen you will see tabs, click on the one that says `Bot` and click it. You will see a button on this screen that says `Add Bot` under the `Build-A-Bot` section, click it. You will be presented with a screen that looks like this:

   ![example of what creating the bot looks like](../images/discord-dev-create-bot.png)

   From this screen you can add the actual `Profile Photo` that will show up in discord for your bot, and you can change the `Username` of the bot that will show up in discord.

   From here scroll down a bit until you find the `Privileged Gateway Intents` section. Turn on the priveleges called `Server Members Intent` and `Message Content Intent`, then save your changes:

   ![shows what the turned on priveleges look like.](../images/discord-dev-priveleges.png)

1. Now we will move on to actually adding your bot to a discord server. On the tabs at the left click on `OAuth2` just above the `Bot` tab and select `URL Generator`. From here we will be turning on various permissions for the bot. Here they are in order:

   - Scopes
     - `bot`
     - `applications.commands`
   - Bot Permissions
     - General Permissions
       - `Read Messages/View Channels`
     - Text Permissions
       - `Send Messages`
       - `Embed Links`
       - `Attach Files`
     - Voice Permissions
       - `Connect`
       - `Speak`

   Below is an example of what the screen should look like after selecting all of these options:

   ![example of turned on commands to make the url](../images/discord-dev-url-creator.png)

   At the bottom of the screen you should see a link with a copy button to the right of it. This is circled in red in the above image. Copy your link and save it somewhere where you can remember. Once we are done this is the link you will use and share with your friends to add your bot to a server.

1. Now go to that link. You will be brought to your typical page to add a bot to a server. Select which server you would like to add your bot to, authorize the permissions, and prove your a human.

   ![showing how to add bot to server through link](../images/discord-add-bot-to-server.gif)

   Congratulations! You've just added a bot to your server. No code is connected to your bot yet so it wont do anything but the first step is now complete. Time to add some code.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Forking The Repo

Forking the Repo. If you don't know what that means essentially its copying my code to make your own editable version. For more information on this see the [GitHub Docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo). To do this you will need to have a GitHub account.

1. At the top of the home page of this Repository you should see a tab called `Fork`:

   ![example of image of fork tab](../images/github-new-fork.png)

   Once you've clicked on that tab you will be presented with the `Create a new fork` page.

   ![example of create a new fork](../images/github-create-a-new-fork.png)

   Customize the title and description to your liking and then click `Create Fork`.

Congratulations! You have successfully copied your own version of the code. Time to customize it to your liking.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Customizing The Code

Now that you have forked the repo you will be presented with your instance of the code. In order to customize your bot we need to open `config.js`. The below image shows you where that can be located from the home screen:

![example of forked repo with config.js circled](../images/github-open-config-file.png)

Once you have clicked on config.js you will be presented with a large screen of code. At the top of that code you will see some buttons that say `Raw`, `Blame`, and a `Pen Emoji`. Select the `Pen Emoji` in order to edit your code:

![config file with a pen image circled](../images/github-config-click-edit.png)

Perfect! Now you are editing the file. This section will now break up into variations of what to do.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### The Bare Minimum Requirements

If you just want to use DumBot as is but own your own instance of him your in luck! All you have to do is change a `0` to a `1` and your code editing is complete.

Somewhere between line 1 - 8 you should see the word `global`. In the image below it is on line `4` but further editing might have this change. Currently line `4` should looks like `global: 0,` | we want to replace that with `global: 1,` . Be aware that there is a comma. That comma is important to keep! Reference the image below to see what it should look like:

![global variable changing from 0 to 1](../images/github-config-change-global.png)

Now scroll all the way down to the bottom of the file and select `Commit changes`:

![config file showing the commit changes button](../images/github-config-commit-changes.png)

That all that we need to do as far as editing files on GitHub. Good job!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Playing With The Config File

This is the real reason to start your own instance of DumBot. This section will describe all of the customization functionality within config.js. In order to edit config.js see the instructions listed above in [The Bare Minimum Requirements](#the-bare-minimum-requirements).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Advanced Development (New Commands)

IN DEVELOPMENT

CHANGE ENV.SAMPLE TO ENV AND ADD TOKEN VARIABLE AND GUILD VARIABLE

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deploy Through Heroku

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[![Home Shield](https://img.shields.io/badge/%E2%86%90_Home-345289?&style=for-the-badge)](../../../README.md)
