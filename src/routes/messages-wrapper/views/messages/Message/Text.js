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

export default function Text({ text, depth = 0 }) {

    let children = [];

    let skipCount = 0;

    text.split('').forEach((letter, i, arr) => {

        if (skipCount > 0) {
            skipCount--;
            return;
        } else {

            let tag = tags.find(tag => tag.char === arr.slice(i, i + 3).join('')) || tags.find(tag => tag.char === letter);

            if (!tag) {

                if (typeof children[children.length - 1] === 'string') children[children.length - 1] += letter;
                else children.push(letter);

            } else {

                let closingIndex = arr.indexOf(tag.char, i + 1);

                if (tag.name === 'pre') {
                    closingIndex = arr.join('').indexOf(tag.char, i + 2);
                } else if (tag.name === 'quote') {
                    closingIndex = /\n|$/.exec(arr.slice(i + 1).join('')).index + i + 1;
                }

                if (closingIndex === - 1) {

                    if (typeof children[children.length - 1] === 'string') children[children.length - 1] += letter;
                    else children.push(letter);

                } else {

                    let contents = arr.slice(i + tag.char.length, closingIndex).join('');

                    skipCount = contents.length + tag.char.length * 2 - 1;

                    children.push(
                        <tag.Tag key={contents + depth + i} >
                            {
                                tag.name === 'pre' || tag.name === 'quote' ?
                                    contents.trim()
                                    :
                                    <Text text={contents.trim()} depth={depth + 1} />
                            }
                        </tag.Tag>
                    );
                }
            }
        }
    });

    if (depth === 0) {
        // console.log(children);
        children = children.map((child, i) => (
            typeof child === 'string' && child.match(/\n/g) ?
                child.trim()
                    .split(/\n/g)
                    .map((line, j) => (
                    <p key={`${i} ${j}`} >{line}</p>
                ))
                :
                child
        ));
    }

    return (
        children.length === 1 ?
            children[0]
            :
            <span>
                {children}
            </span>
    );
}
