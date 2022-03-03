import React from 'react'
import { MapTitlesToKeys, titleProps } from '../Utils'

export default function PreviewContent({selectedWord}) {
    return (
                                <div style={{fontSize:'16px'}}>
                <div className= "title">
                           {Object.keys(titleProps).map(key => {
                               if(key === titleProps[key] && selectedWord[key] != ""){
                                    if(key == 'titre'){
                                        return <span dangerouslySetInnerHTML={{__html: selectedWord[key] + " "}}></span> 
                                    }
                                    if(key == 's_cat'){
                                        return <span style={{fontWeight: 'normal', fontSize: '17px'}} dangerouslySetInnerHTML={{__html: selectedWord[key]}}></span>
                                    }
                                    return <p  style={{fontWeight: 'normal', fontSize: '17px'}} dangerouslySetInnerHTML={{__html: selectedWord[key]}}></p>
                               }
                           })}
                   </div>
                   <div className="mainArea fontTarget">
                       {Object.keys(MapTitlesToKeys).map(key => {
                        if(MapTitlesToKeys[key]){
                           if(key === MapTitlesToKeys[key].name && selectedWord[key] != ""){
                               if(MapTitlesToKeys[key].type === 'normal' && MapTitlesToKeys[key].type){
                                    return <div style={{marginBottom: '1rem'}}>
                                            {MapTitlesToKeys[key].name === 'edition'
                                             ? 
                                            <span style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html:MapTitlesToKeys[key].label + " "}}></span>
                                             : 
                                            <span style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html:MapTitlesToKeys[key].label + " : " }}></span>}<span dangerouslySetInnerHTML={{__html: selectedWord[key]}}></span>
                                        </div>
                               }else if(MapTitlesToKeys[key].type === 'definition'){
                                    return <div style={{marginBottom: '1rem'}}>
                                                {
                                                    selectedWord[key] && selectedWord[key].map(
                                                        (def,index)=>{      
                                                            return<> {  selectedWord[key].length > 1 && <h6>{[index+1] + '.'} </h6> }<p dangerouslySetInnerHTML={{__html: def.definition }}></p>
                                                            {
                                                                def.commentaire && 
                                                                <div style={{marginLeft: '25px'}}><p style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html: def.commentaire }}></p></div>
                                                            }
                                                            </>
                                                        }
                                                    )
                                                }
                                            </div>
                               }
                               else if (MapTitlesToKeys[key].type === 'voir'){
                                    return <>
                                    <div style={{marginBottom: '1rem'}}>
                                                <span style={{fontStyle: 'italic'}}>{MapTitlesToKeys[key].label && MapTitlesToKeys[key].label +" : "}</span>
                                                    
                                                <span>{selectedWord[key] && Array.prototype.map.call(selectedWord[key], function(item) { return item.titre }).join(", ")}</span>
                                                {/* <span>{selectedWord[key] && selectedWord[key].map((e) => <span>{e.titre + ", "}</span>)}</span> */}
                                            </div></>
                               }
                           }
                        }
                        })}
                   </div>
              </div>
    )
}
