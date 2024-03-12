import React from 'react'

function PageTitle(props: {title: string}) {
  return (
    <div className="mt-10">
        <h1 className="text-4xl font-bold"><span className="text-primary">|</span> {props.title}</h1>
      </div>
  )
}

export default PageTitle