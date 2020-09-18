import React from 'react';
function Students()
{
    const students = [
        {name:'이수만', age:'60', address:'인천'},
        {name:'유희열', age:'45', address:'서울'},
        {name:'방시혁', age:'43', address:'부산'},
        {name:'박진영', age:'34', address:'광주'}
    ]
    const test = function(v, i) {
        return <div>{v.name} {v.age} {v.address}</div>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>나이</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
        {
            // students.map(function(v, i) {
            //     return <div>{v.name} {v.age} {v.address}</div>
            // })
            students.map((v, i) => {
                return (
                    <tr>
                        <td>{v.name}</td>
                        <td>{v.age}</td>
                        <td>{v.address}</td>
                    </tr>
                    )
                }
            )
        }
            </tbody>
        </table>
    );
}
export default Students;