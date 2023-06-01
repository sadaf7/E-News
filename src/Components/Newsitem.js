import React from 'react'

const Newsitem = (props) => {
    let {title,description,imgUrl,newsUrl,author,date,source} = props
  return (
    <div>
      <div className="card">
      <div>
      <span className=" badge rounded-pill bg-danger" style={{display: "flex",justifyContent:" end", position: "absolute", right: "0px"}}>
        {source?source:"Unknown"}
        
      </span>
      </div>

        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <div className='text-muted mb-1'>
              <span className='d-block'>Author: {author?author:"Unknown"}</span>
              <span className='d-block'>Published Date: {new Date(date).toGMTString()}</span>
            </div>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
    </div>
  )
}

export default Newsitem
