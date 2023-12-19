import React from 'react'
import { Profile, Header} from '../../components'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const UserProfile = () => {
  const {id} = useParams();
  const {data,loading,error } = useFetch(`/api/users/${id}`)
  if(loading) return <p>Loading</p>
  if(error) return <p>Something Went Wrong</p>
  return ( 
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10  rounded-3xl '>
      <Header title="Thông Tin Người Dùng" />
      <Profile data={data} />
    </div>
  )
}

export default UserProfile