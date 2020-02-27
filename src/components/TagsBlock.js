import React from 'react'
import TechTag from "../components/tags/TechTag"

const TagsBlock = ({ tags, labels }) => {
    const getTechTags = (tags) => {
        const techTags = []
        tags.forEach((tag, i) => {
            labels.forEach((label) => {
                if (tag === label.tag) {
                    techTags.push(<TechTag key={i} tag={label.tag} tech={label.tech} name={label.name} size={label.size} color={label.color} />)
                }
            })
        })
        return techTags
    }
    return (
        <div className="d-block">
            {getTechTags(tags)}
        </div>
    )
}

export default TagsBlock
