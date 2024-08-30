import React from 'react'

type Props = {
    params: { agencyId: string }
}

const page = ({ params }: Props) => {
  return (
    <div>{params.agencyId}</div>
  )
}

export default page