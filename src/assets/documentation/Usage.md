<a name="readme-top"></a>

[![Home Shield](https://img.shields.io/badge/%E2%86%90_Home-345289?&style=for-the-badge)](../../../README.md)

# Using DumBot And The Existing Commands

This file assumes you have already added a version of DumBot to your discord server. In order to accomplish that if you haven't already please reference either of these files before continuing:

- [Use The Existing Instance of DumBot](./Existing-Instance.md)
- [Host & Deploy Your Own Instance of DumBot](./Your-Instance.md)

### Table of Contents

- [The Help Command](#the-help-command)
- [Description of All DumBot Commands](#description-of-all-dumbot-commands)

> **Note**
>
> It is possible that the first 2 or 3 times you try to call DumBot it will say "`The application did not respond`" like this:
>
> ![dumbot application did not respond](../images/dumbot-no-response-msg.png)
>
> This is happening because without paying a subscription for DumBot to be up at all times he will go into sleep mode. After 2 or 3 tries this will resolve itself for about 30 minutes of use.
>
> If you would like to stop this from happening I recommend you [Deploy Your Own Instance of DumBot](./Your-Instance.md) and pay for his server to be up at all times. It will typically cost about $5 - $8.

## The Help Command

Now that DumBot has been added to your server, lets test that he is working. You should see underneath DumBot that he is `playing /help`. This is your indicator to type `/help` in the chat in order to find out what he can do! It should look like the following image:

![/help command short](../images/dumbot-small-help.png)

Wonderful! Now you have a list of commands and possibly a description for those commands. Every single DumBot command begins with the `/` prefix, examples are `/roll`, `/play`, and `/dumbot`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Description of All DumBot Commands

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li>
      <a href="#music-commands">Music Commands</a>
      <ul>
        <li><a href="">/back</a></li>
        <li><a href="">/clear</a>
        <li><a href="">/controller</a></li>
        <li><a href="">/filter</a></li>
        <li><a href="">/jump</a></li>
        <li><a href="">/loop</a></li>
        <li><a href="">/nowplaying</a></li>
        <li><a href="">/pause</a></li>
        <li><a href="">/play</a></li>
        <li><a href="">/playnext</a></li>
        <li><a href="">/queue</a></li>
        <li><a href="">/remove</a></li>
        <li><a href="">/resume</a></li>
        <li><a href="">/save</a></li>
        <li><a href="">/search</a></li>
        <li><a href="">/seek</a></li>
        <li><a href="">/shuffle</a></li>
        <li><a href="">/skip</a></li>
        <li><a href="">/stop</a></li>
        <li><a href="">/volume</a></li>
      </ul>
    </li>
    <li>
      <a href="#core-commands">Core Commands</a>
      <ul>
        <li><a href="#dumbot">/dumbot</a></li>
        <li><a href="#help">/help</a>
        <li><a href="#ping">/ping</a></li>
        <li><a href="#hroll">/hroll</a></li>
        <li><a href="#roll">/roll</a></li>
      </ul>
    </li>
  </ol>
</details>

### Music Commands

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Core Commands

---

#### dumbot

`/dumbot` displays a simple message when called. He essentially says `Hello I am DumBot. I am very dumb`. It will then edit that message 4 times with new information before finally stopping on the original message.

DumBot began as a simple project where I wanted to see if I could add a bot to a server and have it respond with the most simple command possible. It has since turned into a new beast to where DumBot isn't so dumb anymore!

---

#### help

`/help` displays a hidden message that shows all possible commands in a list. It also links back to this repo and this page for full descriptions of what each command does.

---

#### ping

`/ping` displays the [latency](https://www.cloudflare.com/learning/performance/glossary/what-is-latency/), or ping, of DumBot and his responses.

---

#### hroll

`/hroll` is the exact same as [/roll](#roll) but it is a hidden message. This means that only the user who used the command can see the outcome. Perfect for a Dungeon Master or someone who is running a game.

---

#### roll

`/roll` allows the user to input a string of numbers and dice in order to randomly calculate a total. One thing to note is that every input must be followed by a space. So `1d20+1` is invalid, while `1d20 + 1` is valid. 

The bot will then display the users `Input`, the `Result` of each dice rolled, the `Total` of all dice and numbers using relevant math, and the `Crit Total` which displays the value of all dice rolled times 2 plus all relevant math.

Valid inputs are as follows:

- No input rolls a 20 sided die
- 1d20 or some variation. The number before the `d` determines how many dice are to be rolled. The number after the `d` determines how many sides the dice would have. Ex. 5d10 would roll 5 dice of 10 sides. So therefore 1d20 rolls 1 die of 20 sides
- Math such as `+`, `-`, or `*`. The star `*` represents multiplication.
- Integer such as any whole number (Ex. `5`)

Here a few example inputs:

- `/roll`
- `/roll 1d20 + 1`
- `/roll 5 - 1d6 + 4d10 * 2d2`

This is what the output should look like:

![example output for rolling 2d6 + 5 + 1d4](../images/dumbot-dice-roll.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[![Home Shield](https://img.shields.io/badge/%E2%86%90_Home-345289?&style=for-the-badge)](../../../README.md)
