
with open('glass/style.temper', 'w') as out:
    out.write('''
let {...} = import("./core.temper");

export class WrapStyle {
    public set(name: String, value: String): String {
        setStyle(name, value);
        return value;
    }

    public get(name: String): String {
        return getStyle(name);
    }
    ''')
    with open('data/style.txt', 'r') as style:
        for line in style.readlines():
            is_dash = False
            kebab = line.strip()
            if kebab == '':
                continue
            camel = ''
            for i in kebab:
                if i == '-':
                    is_dash = True
                else:
                    if is_dash:
                        camel += i.upper()
                        is_dash = False
                    else:
                        camel += i
            out.write(
                f'''
    public get {camel}(): String {{
        return getStyle("{kebab}");
    }}

    public set {camel}(v: String): String {{
        setStyle("{kebab}", v);
        return v;
    }}
    '''
            )
    out.write('}\n')