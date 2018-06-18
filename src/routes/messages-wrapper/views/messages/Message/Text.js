import React from 'react';

const tags = [
    {
        name: 'bold',
        char: '*',
        Tag: ({ children }) => <b>{children}</b>
    },
    {
        name: 'italic',
        char: '_',
        Tag: ({ children }) => <em>{children}</em>
    },
    {
        name: 'strike',
        char: '~',
        Tag: ({ children }) => <span className="strikethrough" >{children}</span>
    },
    {
        name: 'pre',
        char: '```',
        Tag: ({ children }) => <pre><code>{children}</code></pre>
    },
    {
        name: 'code',
        char: '`',
        Tag: ({ children }) => <code>{children}</code>
    },
    {
        name: 'quote',
        char: '>',
        Tag: ({ children }) => <blockquote>{children}</blockquote>
    }
];

let protect = 0;

export default function Text({ text }) {

    console.log(text);

    const children = [];

    for (let i = 0; i < text.length; i++) {

        let letter = text[i];

        let tag = tags.find(tag => tag.char === text.slice(i, i + 3)) || tags.find(tag => tag.char === letter);

        if (!tag) {

            if (typeof children[children.length - 1] === 'string') children[children.length - 1] += letter;
            else children.push(letter);

        } else {

            if (protect < 1000) {

                protect++;

                let closingIndex = text.indexOf(tag.char, i + 1);

                if (tag.name === 'quote') {
                    let match = /\n|$/.exec(text.slice(i + 1));
                    closingIndex = match && match.index;
                }

                if (closingIndex === - 1) {

                    if (typeof children[children.length - 1] === 'string') children[children.length - 1] += letter;
                    else children.push(letter);

                } else {

                    let contents = text.slice(i + tag.char.length, closingIndex);

                    children.push(
                        <tag.Tag>
                            {
                                tag.name === 'pre' ?
                                    contents.trim()
                                    :
                                    <Text text={contents} />
                            }
                        </tag.Tag>
                    );

                    i = closingIndex - 1 + tag.char.length;
                }
            }
        }
    }

    console.log(children);

    return (
        children.length === 1 ?
            children[0]
            :
            <span>
                {children}
            </span>
    );
}
