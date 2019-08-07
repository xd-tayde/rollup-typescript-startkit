import query from "@amoy/query"

const ext = {};

['appendTo', 'append', 'before', 'after', 'insertBefore', 'insertAfter', 'remove', 'removeChild'].map((name: string) => {
    ext[name] = function(this: any, element: any) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].layout) {
                this[i][name](element)
            }
        }
    }
});

(query as any).extend(ext)
