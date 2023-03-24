import {mapMutations } from "vuex";
export default{
    mounted(){
        //const bread=this.$route.meta.bread?this.$route.meta.bread:[]
        const bread=this.$route.meta.bread||[]
        this.setBreadCrumb(bread)
    },
    methods:{
        ...mapMutations(['setBreadCrumb']),
    }
}