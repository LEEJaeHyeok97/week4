import { Router } from "express";
import { Posts } from "../models";

const router = Router();





//게시글 목록 조회
router.get('/', async(req, res) => {

    const postDatas = await Posts.findAll({});

    return res.json({
        data: postDatas
    });

});


//게시글 개별 조회
router.get('/:writer1', async(req, res) => {

    const { writer1 } = req.params;

    
    const postData = await Posts.findOne({ where:  { writer: writer1}  });
    //console.log(typeof postData);

    if(postData !== -1) {
        return res.json({
            data: postData
        });
    };


    return res.json({
        "error": "찾으시는 게시글이 없습니다"
    });

});



//글 생성
router.post('/', async(req, res) => {
    const post_list = await Posts.create({
        title: req.body.title,
        flag: req.body.flag,
        store: req.body.store,
        content : req.body.content,
        writer : req.body.writer,
    });

    return res.json({
        data: {
            post: {
                title: post_list.title
            }
        }
    });
});

// 글 수정
router.put('/:postWriter', async (req, res) => {
    const { postWriter } = req.params;
    const { content } = req.body;


    const existPost = await Posts.findOne({
        where: { writer: postWriter }
    });

    if(existPost) {
        await Posts.update(
            {
            content
            },
            { where: { writer: existPost.writer }}
        );
        return res.json({ data: { content: existPost.content }});
    }

    return res.json({
        error: "Cannot modify post"
    });


});





// 글 삭제
router.delete('/:postId', async(req, res) => {

    const { postId } = req.params;

    const existPost2 = Posts.findOne({ where: { writer: postId}});

    if(existPost2 !== -1) {
    await Posts.destroy({where: { writer: postId }});
        return res.json({ data: "삭제에 성공했습니다!"});   

    };

    return res.json({ error: "삭제할 수 없습니다."});
});








export default router;