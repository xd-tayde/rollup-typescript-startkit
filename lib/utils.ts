export const parseStyle = (styleString: string) => {
    const params = {}
    if (styleString && typeof styleString === 'string') {
        let str = styleString.trim().split(/;|,/)
        for (let i = 0, n = str.length; i < n; i++) {
            if (str[i]) {
                const param = str[i].split(/:|=/)
                params[param[0].trim()] = param[1].replace(/'|"/g, '').trim()
            }
        }
    }
    return params
}

export const camelize = (str) => (str + "").replace(/[_|-]\D/g, (match) => match.charAt(1).toUpperCase())

export const styleCamelize = (style) => {
    if (typeof style === 'object') {
        Object.keys(style).map((key: string) => {
            if (key.includes('_') || key.includes('-')) {
                style[camelize(key)] = (style[key])
                delete style.key
            }
        })
    }
    return style
}
