// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract BlogApp {

    // events
    event BlogCreated
    (
        uint256 blogId,
        string blogcoverhash,
        string blogtitle,
        string blogcontent,
        string category,
        string date,
        address user
    );

    event BlogUpdated
    (
        uint256 blogId,
        string blogcoverhash,
        string blogtitle,
        string blogcontent,
        string category,
        string date,
        address user
    );

    event BlogComment
    (
        uint256 commentId,
        uint256 blogId,
        string commentbody,
        string date,
        address user
    );

    using Counters for Counters.Counter;
    Counters.Counter private _blogId;
    Counters.Counter private _commentId;

    string private name;
    address private owner;

    // id to blog
    mapping(uint256 => Blog) private idtoBlog;
    
    struct Blog {
        uint256 blogId;
        string blogcoverhash;
        string blogtitle;
        string blogcontent;
        string category;
        string date;
        address user;
        Comment[] comments;
    }

    struct Comment {
        uint256 commentId;
        uint256 blogId;
        string commentbody;
        string date;
        address user;
    }

    constructor(string memory _name) {
        console.log(_name);
        name = _name;
        owner = msg.sender;
    }

    // add blog 
    function createblog(
        string memory _blogcoverhash,
        string memory _blogtitle,
        string memory _blogcontent,
        string memory _category,
        string memory _date
        ) public {
            require(bytes(_blogcoverhash).length > 0, "please add image for the Blog");
            require(bytes(_blogtitle).length > 0,"Please add blog title");
            require(bytes(_blogcontent).length > 0,"Please add Blog Body");
            require(bytes(_category).length > 0,"Please add category");
            require(bytes(_date).length > 0,"Please Add the Blog Date");
            //increment blogid by 1
            _blogId.increment();

            // get the current blogid    
            uint256 blogIdcurrent = _blogId.current();
            Blog storage blog = idtoBlog[blogIdcurrent];
            blog.blogId = blogIdcurrent;
            blog.blogcoverhash = _blogcoverhash;
            blog.blogtitle = _blogtitle;
            blog.blogcontent = _blogcontent;
            blog.category = _category;
            blog.date = _date;
            blog.user = msg.sender;     

            // emit an event
            emit BlogCreated(blogIdcurrent, _blogcoverhash, _blogtitle, _blogcontent, _category, _date, msg.sender);       
        }

        // get blog by id
        function getblog(uint256 _blogid) public view returns (Blog memory) {
            return idtoBlog[_blogid];
        }

        // update by id
        function updateblog(uint256 _blogid,
        string memory _blogcoverhash,
        string memory _blogtitle,
        string memory _blogcontent,
        string memory _category
        ) public onlyOwner {
            require(_blogid != 0,"Don't have blog id");
            require(bytes(_blogcoverhash).length > 0, "please add image for the Blog");
            require(bytes(_blogtitle).length > 0,"Please add blog title");
            require(bytes(_blogcontent).length > 0,"Please add Blog Body");
            require(bytes(_category).length > 0,"Please add category");

            Blog storage blog = idtoBlog[_blogid];
            blog.blogcoverhash = _blogcoverhash;
            blog.blogtitle = _blogtitle;
            blog.blogcontent = _blogcontent;
            blog.category = _category;
        
            emit BlogUpdated(_blogid, _blogcoverhash, _blogtitle, _blogcontent, _category, blog.date, msg.sender);
        }

        // fetch all blogs
        function getallblogs() public view returns (Blog[] memory) {
            // current id
            uint256 totalblogs = _blogId.current();

            Blog[] memory blogs = new Blog[](totalblogs);

            for(uint i = 0; i < totalblogs ; i++) {
            uint currentId = i + 1;
            Blog storage currentItem = idtoBlog[currentId];
            blogs[i] = currentItem;
            }

            return blogs;
        }

        // post comment on blog by id
        function postcomment(uint256 _blogid, string memory _commentbody,string memory _date) public {
            require(_blogid != 0,"Don't have blog id");
            require(bytes(_commentbody).length > 0,"Please Add Comment");

             _commentId.increment();

            uint256 currentCommentId = _commentId.current();   

            Comment memory comment;
            comment.commentId = currentCommentId;
            comment.blogId = _blogid;
            comment.commentbody = _commentbody;
            comment.date = _date;
            comment.user = msg.sender;

            Blog storage blog = idtoBlog[_blogid];
            blog.comments.push(comment);

            emit BlogComment(currentCommentId,_blogid,_commentbody,_date,msg.sender);
        }

        // validation
        modifier onlyOwner() {
            require(owner == msg.sender,"You Don't Own this Blog Shame on You");
            _;
        }

}