const _cvs_ = document.createElement("canvas");
const _ctx_ = _cvs_.getContext('2d');

const colors = ["#000000", "#ffffff", "#ff0000", "#00ff00",
    "#0000ff", "#ffff00", "#00ffff", "#ff00ff",
    "#bf9d85", "#1a62ff", "#ffd700", "#348C31"];

const patternToImage = (pattern) => {
    const pattern_ = pattern.slice();
    const scale = 10;
    _cvs_.width = pattern_[0].length * scale;
    _cvs_.height = pattern_.length * scale;
    _ctx_.clearRect(0, 0, _cvs_.width, _cvs_.height);

    for (let y = 0; y < pattern_.length; y++) {
        for (let x = 0; x < pattern_[y].length; x++) {
            _ctx_.fillStyle = colors[pattern_[y][x]];
            _ctx_.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    const imgData = _ctx_.getImageData(0, 0, _cvs_.width, _cvs_.height);
    _ctx_.putImageData(imgData, 0, 0);

    const image = new Image();
    image.src = _cvs_.toDataURL();
    return image;
}

let images = [];

function get2dAttayEdges(pattern) {
    let edegs = {
        top: "",
        right: "",
        bottom: "",
        left: ""
    };

    for (let i = 0; i < pattern[0].length; i++) {
        // top edeg
        edegs.top += pattern[0][i];

        // bottom edeg
        edegs.bottom += pattern[pattern.length - 1][i];
    }

    for (let i = 0; i < pattern.length; i++) {
        // right edeg
        edegs.left += pattern[i][0];

        // left edeg
        edegs.right += pattern[i][pattern[i].length - 1];
    }

    return edegs;
}

function pushImage(pattern) {
    images.push({
        img: patternToImage(pattern),
        edegs: get2dAttayEdges(pattern)
    })
}

function createImages(patterns) {
    images = [];
    patterns.forEach((pattern) => {
        let ptn = pattern.slice();
        let rotatePtn = rotate2dArray(ptn);
        let rotatePtn3rd = rotate2dArray(rotatePtn);
        pushImage(pattern);

        let sameAll = rotatePtn.every((E, i) => E.every((e, j) => ptn[i][j] == e));

        if (!sameAll) {
            let sameTwo = rotatePtn3rd.every((E, i) => E.every((e, j) => ptn[i][j] == e));
            if (sameTwo) {
                pushImage(rotatePtn);
            } else {
                pushImage(rotatePtn);
                pushImage(rotatePtn3rd);
                pushImage(rotate2dArray(rotatePtn3rd));
            }
        }
    });
}

