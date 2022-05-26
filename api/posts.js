import { Router } from "express";
import { Posts } from "../models";

const router = Router();

let index = 1;

//글 목록 조회
router.get('/', async(req, res) => {
    const { content } = req.body;

    const postDatas = await Posts.findAll({});
    if(postDatas){
        return res.json({
            data: postDatas
        });
    }

    return res.json({
        data: "[]"
    });
});


//글 개별 항목 조회   !대충 짜놔서 글 생성 코드 만들고 실행하면서 로직을 다시 생각해 보아야함 뀨
router.get('/:postid', async(req, res) => {
    const { postid } = req.params;
    //params로 id값을 받아옴
    const a = await Posts.findOne({ where: {id} });

    if(a) {
        return res.json({
            data: Posts[id]
        });
    }

    return res.json({
        "error": "Post not exist"
    });



});

//글 생성
router.post('/', async(req, res) => {
    const t = req.header("X-User-Id"); //user-Id
    const { content } = req.body;

    const post_list = await Posts.create({
        content,
        writer : index++
        // index++말고 id로 받아오는 방법을 고민 해보았으나 오류가 났음
    });

    return res.json({
        data: {
            post: {
                //post_list.id 이거 리스트 인덱스값이 출력됨
                id: post_list.id
            }
        }
    });
});


//특정 글 수정
router.put('/:postId', async(req, res) => {
    const { user } = req.params;
    const { newContent } = req.body;

    const a = await Posts.findOne({where : {user}});

    if(a){
        await Posts.update({
            content: newContent
        }, {
            where: { id: user}
        });

        return res.json({
            data: {
                id: user
            }
        });
    }


});


//특정 글 삭제
router.delete('/:postId', async(req, res) => {
    const { user } = req.params;
    
    const a = await Posts.findOne({where: user});

    if(a) {
        await Posts.destroy({
            where: { id: user },
        });
        return res.json({
            data: "Successfully deleted"
        });
    }

    return res.json({
        "error" : "Cannot delete post"
    });
});









export default router;