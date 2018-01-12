let PARAMS = {
    LINUX: 'linux',
    WINDOWS: 'win'
};

module.exports = {
    list: [
        {
            "name": "第一个工程",
            "desc": "第一个工程的描述信息",
            "compiler": [
                {
                    name: '默认构建脚本',
                    platform: PARAMS.WINDOWS,
                    script: "test.bat"
                },
                {
                    name: '默认发布脚本',
                    platform: PARAMS.WINDOWS,
                    script: "test.bat"
                }
            ]
        },
        {
            "name": "第二个工程",
            "desc": "第二个工程的描述信息",
            "param": {},
            "compiler": [
                {
                    name: '默认构建脚本',
                    platform: PARAMS.WINDOWS,
                    script: "scripts/win/test.bat"
                },
                {
                    name: '默认发布脚本',
                    platform: PARAMS.WINDOWS,
                    script: "test.bat"
                }
            ]
        }
    ]
};