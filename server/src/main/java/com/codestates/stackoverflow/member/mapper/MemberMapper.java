package com.codestates.stackoverflow.member.mapper;

import com.codestates.stackoverflow.member.dto.MemberDto;
import com.codestates.stackoverflow.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
