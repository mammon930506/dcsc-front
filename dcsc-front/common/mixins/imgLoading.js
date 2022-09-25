
import jlConfig from '@/common/utils/jlConfig'

export default {
    data () {
        return {
            imgLoaded:false
        }
    },
    created () {

    },
    methods: {
        checkImageLoad(src){
            return new Promise((resolve,reject)=>{
				// #ifdef APP-PLUS
				this.imgLoaded= true
				resolve()
				// #endif
				// #ifdef H5
                if(!src){
                    return resolve()
                }
                let img = document.createElement('img')
                img.onload = ()=>{
                    this.imgLoaded= true
                    resolve()
                }
                img.onerror = ()=>{
                    resolve()
                }
                img.src = jlConfig.imgUrl+src+jlConfig.imgSuffix
				// #endif
            })
        }
    }
}

