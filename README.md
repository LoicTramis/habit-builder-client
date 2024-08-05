# Good habit builder

_A progress everyday will go a very long way_

<p style="font-size: 1.5rem; font-weight: bold; opacity: 0.8">
<a href="https://habit-builder.netlify.app">🚀 LIVE VERSION 🚀</a>
</p>

<span style="font-weight: bold; color: #59ABE3;">DEMO ACCOUNT</span>: _louise.belcher<span>@</span>bob.com - password_

Build good habit by setting up goal, forming group around that goal and putting the work to make that change

<!--
TODO - Change: difficulty & frequency selects to pick-up card
TODO - Add: button on start and end date tag that go to the start / end date on calendar
TODO - Add: Close icon on login / sign up page
TODO - Add: Settings menu for Edit & Delete option in detail habit
TODO - Add: Dark mode
-->

## Logic

### Create a group habit

- set up a goal (multiple habits)
- set up a deadline (for all habits)
- set up a frequency (for each habits)
- change title
- change description

### Social part

You can create a group habit (you become admin of that group)  
You can join a group  
You can participate in a habit

## Interesting technical stuff

### Typescript

Casting HTMLElement into HTMLInputElement to pass TS validation for the .name and .value of HTMLElement.

```ts
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
```

## Style

- CSS: TailwindCSS
- Fonts: Nunito sans

## Deployment

- Front-end hosted with [Netlify](https://habit-builder.netlify.app)
- Back-end hosted with [Render](https://habit-builder-server.onrender.com)
- Database hosted with [MongoDB Atlas](https://cloud.mongodb.com/)

## Configuration

### Formatting

- [Prettier](https://prettier.io/docs/en/options)
- [Prettier for TailwindCss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
