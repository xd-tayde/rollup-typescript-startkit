import * as PIXI from "pixi.js"
import query from "@amoy/query"
import QueryComponents, { style } from "../lib"
import "./main.scss"

// @ts-ignore
import rect from './images/rect.jpg'

const { innerWidth: width, innerHeight: height } = window
const game = new PIXI.Application({
    width,
    height,
    backgroundColor: 0xffffff,
})
document.body.appendChild(game.view)

const $ = query(game.stage)
query['use'](QueryComponents)

style('container', `
    width: 600; 
    height: 600;
    center-x: 0; 
    center-y: 0; 
    borderWidth: 2;
`)

style({
    sprite: `
        width: 250; 
        height: 250; 
        left: 30; 
        top: 30;
        text-align: center;
        font-size: 50px;
    `,
    rect: `
        width: 250; 
        height: 250; 
        right: 30; 
        top: 30; 
        background-color: red; 
        border-width: 3; 
        border-radius: 50;
    `,
    circle: `
        width: 250; 
        height: 250; 
        left: 30; 
        bottom: 30; 
        background-color: red; 
        border-width: 5; 
        border-color: blue;
    `,
    text: `
        width: 250; 
        right: 30; 
        bottom: 30; 
        font-size: 30; 
        color: #a72461; 
        line-height: 60;
    `,
})

PIXI.Loader.shared.add('rect', rect).load((loader, resources) => { 
    const $sprite = $(`
        <container className="container">
            <sprite className="sprite" src="rect">精灵图</sprite>
            <rect className="rect" />
            <circle className="circle" />
            <text className="text">这是一段测试文字文字文字，它会自动换行哦~</text>
        </container>
    `)
    $sprite.appendTo(game.stage)
})
