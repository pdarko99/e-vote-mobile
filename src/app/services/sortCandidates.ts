export class sortCands{
    constructor(){}


    sortCandidates(data){
        let formatedCand = []
        let position =['President', 'Financial', 'Wocom', 'Financial', 'Organizer', 'Treasure', 'Secretary']
 
        position.forEach(element => {
          let res =  data.filter(x => x.position === element)
         
          if(res && res.length){
            let newObj = {
              position: '',
              candidates: []
            }
            newObj.position = element
            newObj.candidates = res
    
            formatedCand.push(newObj)
          }
    
        })
    
        return formatedCand
    }
}