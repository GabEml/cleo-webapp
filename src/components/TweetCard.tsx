import React from 'react'
//import dayjs from 'dayjs'
//import relativeTime from 'dayjs/plugin/relativeTime'


//dayjs.extend(relativeTime)


type Tweet = {
    id: string
    name: string
    username: string
    avatarUrl?: string
    text: string
    createdAt: string
    url: string
}


export default function TweetCard({ tweet }: { tweet: Tweet }) {
    return (
        <a href={tweet.url} target="_blank" rel="noreferrer" className="block">
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-3">
                <img src={tweet.avatarUrl} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                <div>
                    <div className="flex items-center gap-2">
                        <strong>{tweet.name}</strong>
                        <span className="text-sm text-slate-500">@{tweet.username}</span>
                        <span className="text-xs text-slate-400">· {/*dayjs(tweet.createdAt).fromNow()*/}</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-700">{tweet.text}</div>
                </div>
            </div>
        </a>
    )
}