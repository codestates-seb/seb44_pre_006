//리덕스 테스트용 파일 입니다.
import { useSelector ,useDispatch} from 'react-redux';
import { setName } from '../store/memberSlice'; //멤버 슬라이스에서 가져온 리듀서 (상태변경 함수)

function ReduxTest(){

    const dispatch = useDispatch(); //단방향 데이터 흐름을 위한 디스패치 호출
    const member = useSelector(state => state.member) // 전역상태 member 호출

  
    return(
        <div>
            <button onClick={() => dispatch(setName('won young'))}>원영으로 이름 변경</button>
            <button onClick={() => dispatch(setName('Jeein Park1'))}>지인으로 이름 변경</button>
            <p>{member.data.email}</p>
            <p>{member.data.name}</p>
        </div>
    )
}

export default ReduxTest;