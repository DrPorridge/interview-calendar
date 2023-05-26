class Interview{
    constructor(date,scheduled){
        this.date=date
        this.scheduled=scheduled
        this.scheduledTime=scheduled?`${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`:''
        this.isSelected=false
    }

    compareDate(date){
        if(
            this.date.getFullYear() === date.getFullYear() &&
            this.date.getMonth() === date.getMonth() &&
            this.date.getDate() === date.getDate() &&
            this.date.getHours() === date.getHours()
        ){
            
            return true
        }
        else{
            return false
        }
    }

    setTime(timeString){
        const [hours, minutes] = timeString.split(':').map(Number);
        this.date.setHours(hours);
        this.date.setMinutes(minutes);
    }

    setScheduled(scheduledDate){
        this.scheduled=true
        this.scheduledTime=scheduledDate?`${scheduledDate.getHours()}:${scheduledDate.getMinutes() < 10 ? '0' : ''}${scheduledDate.getMinutes()}`:''
    }


}

export default Interview