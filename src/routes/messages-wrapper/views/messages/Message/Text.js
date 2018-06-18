import React from 'react';

export default function Text({ text }) {
    let preBlocks = text.split(/```/g);
    return preBlocks.map((block, i) => (
        i % 2 ?
            <pre>
                <code>
                    {block.split(/\n/g).map((p, j) => (
                        <p key={`${i} ${j}`} >{p}</p>
                    ))}
                </code>
            </pre>
            :
            block.split(/\n/g).map((p, j) => (
                p[0] === '>' ?
                    <blockquote key={`${i} ${j}`} >
                        {p}
                    </blockquote>
                    :
                    <p key={`${i} ${j}`} >
                        {/* {p.split(/_/g).map((s, k) => (
                            k % 2 ?
                                <
                        ))} */}
                        {p}
                    </p>
            )))
    );
}
