import React from 'react'
import { mapAuthorProps} from '../Utils'

export default function AuthorContent({author}) {
    return (
             <div style={{fontSize:'16px'}}>
                        <div>
                            {
                                Object.keys(mapAuthorProps).map((key) =>  

                                {
                                    if(key === mapAuthorProps[key].name)
                                        if(mapAuthorProps[key].name === 'liens' && author[key] != '[]'){
                                          return <div style={{fontSize: '16px'}}><span style={{fontStyle: 'italic'}}>{mapAuthorProps[key].label + " : "}</span><span >{author[key] && author[key].map(lien => lien.titre + ', ')}</span><br /></div>
                                        }
                                        if(mapAuthorProps[key].name === 'bibliographie'){
                                            return <div style={{fontSize: '16px'}}><span style={{fontStyle: 'italic'}}>{mapAuthorProps[key].label + " : "}<span >{author[key] && author[key].map(biblio => <><br></br> {biblio}</>)}</span></span></div>
                                        }
                                        return <div style={{fontSize: '16px'}}><span style={{fontStyle: 'italic'}}>{mapAuthorProps[key].label + " : "}</span><span >{author[key]}</span><br /></div>             
                                }
                                )
                            }
                        </div>
              </div>
    )
}
