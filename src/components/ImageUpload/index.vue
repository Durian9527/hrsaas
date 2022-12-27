<template>
  <div>
    <el-upload :class="{ disabled: fileComputed }" list-type="picture-card" :limit="1" action="#" :on-preview="preview" :file-list="fileList" :on-remove="handleRemove" :on-change="changeFile" :before-upload="beforeUpload" :http-request="upload">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 200px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDw0ta5NMCrKm5D8qKbNvVxENK8lCPQGwX', // 身份识别 ID
  SecretKey: 'Xr0wiIvOflhS4Xrz20nPuKjy34xjO0Us' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的UID
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    //   this.fileList = fileList
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
    //   console.log(file)
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'durian-101-1316264978', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          StorageClass: 'STANDARD',
          // 进度
          onProgress: (params) => {
            // console.log(JSON.stringify(params))
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // 根据status判断是否上传成功
          // 如果有很多图片上传成功，需要查找哪一张是当前上传成功的图片
          // 找到之后把地址赋给this.fileList，数据回流，这时组件就会根据this.fileList的变化去更新视图
          // upload: true 表示这张图片已经上传完毕
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" >
.disabled .el-upload--picture-card {
    display: none;
}
</style>
