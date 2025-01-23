'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AssigneeSelect = () => {

    // const [users, setUsers] = useState<User[]>([])

    // useEffect(() => {
    //   const fetchUser = async () => {
    //     const {data} = await axios.get('/api/users')
    //     setUsers(data)
    //   }

    //   fetchUser()
    // }, [])
    
    const{data:users, error, isLoading} = useQuery<User[]>({
        queryKey:['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

  return (
    <>
    <Select.Root>
        <Select.Trigger placeholder='Assign to:'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Unassigned</Select.Label>
                {users?.map(user=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                
            </Select.Group>
        </Select.Content>
    </Select.Root>
    </>
  )
}

export default AssigneeSelect