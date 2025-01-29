import { Card } from '@radix-ui/themes';
import React from 'react'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"

const IssueChart = ({open, inProgress, closed}:{open:number;inProgress:number;closed:number}) => {

    const data = [
        {label: "Open", value:open},
        {label: "In Progress", value:inProgress},
        {label: "Closed", value:closed},
    ]
  return (
    <>
    <Card>
        <ResponsiveContainer>
            <BarChart data={data}>
                <XAxis dataKey={'label'}/>
                <YAxis />
                <Bar dataKey={'value'} barSize={140} style={{fill:"var(--iris-7"}} />
            </BarChart>
        </ResponsiveContainer>
    </Card>
    </>
  )
}

export default IssueChart