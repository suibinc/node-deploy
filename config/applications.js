let PARAMS = {
    LINUX: 'linux',
    WINDOWS: 'win'
};

module.exports = {
    list: [
        {
            "name": "第一个工程",
            "desc": "第一个工程的描述信息",
            "compile": [
                {
                    name: '默认构建脚本',
                    platform: PARAMS.WINDOWS,
                    script: "test.bat"
                }
            ],
            "deploy": [
                {
                    name: '默认发布脚本',
                    platform: PARAMS.WINDOWS,
                    script: "test.bat"
                }
            ]
        }
    ],
    scripts: [
        {
            name: 'HELLO',
            file: 'test.sh'
        }
    ]
};