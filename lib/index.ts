import { Sprite, Text, Rect, Container, Circle } from '@amoy/components'
import HTML from 'html-parse-stringify'
import { parseStyle, styleCamelize } from './utils'
import { extend } from './extend'
import './query-extend'

const styles = {}

export const style = (className: string | object, styleStr?: string) => {
    if (typeof className === 'string') {
        styles[className] = styleStr
    } else if (typeof className === 'object') {
        Object.keys(className).map((cls: string) => {
            styles[cls] = className[cls]
        })
    }
}

const createNode = (node: any) => {
    let element: any = null
    if (node.type === 'tag') {
        const { style, src: image, className, ...rest } = node.attrs
        const classStyle = parseStyle(styles[className])
        const inlineStyle = parseStyle(style)
        
        const _style = styleCamelize(extend(classStyle, inlineStyle))
        switch (node.name.toLowerCase()) {
            case 'sprite':
                element = Sprite(image, _style)
                break
            case 'text':
                let content = ''
                node.children.map((child) => {
                    if (child.type === 'text') {
                        content += child.content
                    }
                })
                element = Text(content, _style)
                break
            case 'container':
                element = Container(_style)
                break
            case 'rect':
                element = Rect(_style)
                break
            case 'circle': 
                element = Circle(_style)
                break
        }
        Object.assign(element, rest)
    } else if (node.type === 'text') {
        element = Text(node.content.trim())
    }
    return element
}

const addChild = (rootTag, root) => {
    if (rootTag.children && rootTag.children.length) {
        rootTag.children.map((childTag) => {
            const child = createNode(childTag)
            if (child) {
                addChild(childTag, child)
                child.appendTo(root)
            }
        })
    }
}

export default function(selector: any) {
    if (typeof selector === 'string') {
        const ast = HTML.parse(selector)
        if (ast && ast.length) {
            if (ast.length > 1) {
                console.info('the root should only be a tag. more than one will be ignored.')
            }

            const rootTag = ast[0]
            const root = createNode(rootTag)
            addChild(rootTag, root)
            return root
        }
    }
    return selector
}
